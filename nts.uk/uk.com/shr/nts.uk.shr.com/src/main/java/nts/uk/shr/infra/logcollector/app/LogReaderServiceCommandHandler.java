package nts.uk.shr.infra.logcollector.app;

import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.Charset;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import org.apache.commons.io.IOUtils;

import jcifs.smb.SmbFile;
import jcifs.smb.SmbFileInputStream;
import lombok.SneakyThrows;
import nts.arc.layer.app.command.AsyncCommandHandler;
import nts.arc.layer.app.command.AsyncCommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.file.storage.StoredFileInfo;
import nts.arc.layer.infra.file.export.FileGeneratorContext;
import nts.arc.layer.infra.file.export.WorkingFile;
import nts.arc.layer.infra.file.storage.StoredFileInfoRepository;
import nts.arc.layer.infra.file.storage.StoredFileStreamService;
import nts.arc.layer.infra.file.temp.ApplicationTemporaryFile;
import nts.arc.layer.infra.file.temp.ApplicationTemporaryFileFactory;
import nts.arc.layer.infra.file.temp.ApplicationTemporaryFilesContainer;
import nts.arc.task.data.TaskDataSetter;
import nts.arc.time.GeneralDateTime;
import nts.uk.shr.infra.logcollector.dom.LogAccessInfo;
import nts.uk.shr.infra.logcollector.dom.LogAccessInfoRepository;
import nts.uk.shr.infra.logcollector.dom.StackTraceInTime;

@Stateless
public class LogReaderServiceCommandHandler extends AsyncCommandHandler<LogReadRequest> {

	private static final String DATETIME_FORMAT = "yyyy/MM/dd HH:mm:ss";
	private static final String DEFAULT_FILE_NAME = "SERVER_LOG_";
	private static final String DEFAULT_ZIP_FILE_NAME = "SERVER_LOG.ZIP";
	private static final String DEFAULT_FILE_TYPE = "text/plain";
	private static final String DEFAULT_ZIP_FILE_TYPE = "application/zip";
	public static final String DEFAULT_ENCODE = "Shift_JIS";

	@Inject
	private LogAccessInfoRepository logAccessRepo;

	@Inject
	private StoredFileInfoRepository fileInfoRepository;

	@Inject
	private StoredFileStreamService fileStreamService;

	@Inject
	private ApplicationTemporaryFileFactory tempFileFactory;

	@Override
	@SneakyThrows
	protected void handle(CommandHandlerContext<LogReadRequest> context) {
		TaskDataSetter dataSetter = context.asAsync().getDataSetter();
		dataSetter.setData("startTime", GeneralDateTime.now().toString(DATETIME_FORMAT));

		if (context.getCommand().getStart() == null)
			context.getCommand().setStart(GeneralDateTime.now());
		if (context.getCommand().getEnd() == null)
			context.getCommand().setEnd(GeneralDateTime.now());

		List<LogAccessInfo> accessInfos = logAccessRepo.getBy(context.getCommand().getDomains(),
				context.getCommand().getHosts());

		Map<String, List<LogAccessInfo>> targetMap = accessInfos.stream().collect(
				Collectors.groupingBy(c -> c.getDomain() + c.getHost() + c.getLocation(), Collectors.toList()));

		String taskID = ((AsyncCommandHandlerContext<LogReadRequest>) context).getTaskId();

		ApplicationTemporaryFilesContainer container = tempFileFactory.createContainer();
		FileGeneratorContext fileContext = new FileGeneratorContext();
		fileContext.setTaskId(taskID);
		
		targetMap.entrySet().stream().map(info -> {
			ApplicationTemporaryFile audit = tempFileFactory.createTempFile();
			FileEntryFilter filter = new FileEntryFilter(context.getCommand().getStart().localDateTime(),
					context.getCommand().getEnd().localDateTime());

			establish(info.getValue().get(0), audit);

			StackTraceInTime trace = filter.scan(audit);
			trace.setNode(info.getValue().get(0).getHost());
			audit.dispose();
			
			return trace;
		}).forEach(s -> {
			ApplicationTemporaryFile auditFile = tempFileFactory.createTempFile();
			WorkingFile workingFile = new WorkingFile(DEFAULT_FILE_NAME + s.getNode() + ".TXT", auditFile, DEFAULT_FILE_TYPE);
			try (OutputStream os = auditFile.createOutputStream()) {
				try (BufferedWriter bw = new BufferedWriter(
						new OutputStreamWriter(os, Charset.forName(DEFAULT_ENCODE)))) {
					s.write(bw);
				}
			} catch (IOException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
			workingFile.getTempFile().closeOutputStream();
			fileContext.addWorkingFile(workingFile);
		});
		
		Path zipFile = container.zipWithName(fileContext, DEFAULT_ZIP_FILE_NAME, false);

		try (InputStream is = new FileInputStream(zipFile.toFile())) {
			
			StoredFileInfo fileInfo = fileInfo(zipFile, taskID);
			fileInfoRepository.add(fileInfo);
			fileStreamService.store(fileInfo, is);
		} finally {
			
			fileContext.dispose();
			container.removeContainer();
		}


		dataSetter.setData("endTime", GeneralDateTime.now().toString(DATETIME_FORMAT));
	}

	/**
	 * Establish.
	 * 
	 * @param info
	 *            log access info
	 * @return file
	 */
	@SneakyThrows
	private void establish(LogAccessInfo info, ApplicationTemporaryFile audit) {
		SmbFile file = ShareConnection.getSmbFile(info);
		try (InputStream is = new SmbFileInputStream(file)) {
			IOUtils.copyLarge(is, audit.createOutputStream());
			audit.closeOutputStream();
		}
	}

	private StoredFileInfo fileInfo(Path zipFile, String fileId) {
		return StoredFileInfo.createNewTemporaryWithId(fileId, DEFAULT_ZIP_FILE_NAME, DEFAULT_ZIP_FILE_TYPE,
				zipFile.toFile().length());
	}
}
