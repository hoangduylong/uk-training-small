package nts.uk.shr.infra.file.storage.webapi;

import java.io.InputStream;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import lombok.val;
import nts.arc.layer.app.file.storage.FileStorage;
import nts.arc.layer.app.file.storage.StoredFileInfo;
import nts.arc.layer.infra.file.storage.StoredFileInfoRepository;
import nts.arc.layer.infra.file.storage.StoredFileStreamService;
import nts.uk.shr.infra.file.storage.filestereotype.FileStereoTypeDescriptionExtend;

@Path("/shr/infra/file/storage")
public class FileStorageWebService {

	@Inject
	private StoredFileInfoRepository fileInfoRepository;

	@Inject
	private StoredFileStreamService fileStreamService;
	
	@Inject
	private FileStorage fileStorage;

	@GET
	@Path("get/{fileid}")
	public Response download(@PathParam("fileid") String fileId) {
		return this.fileInfoRepository.find(fileId)
				.map(fileInfo -> this.buildFileResponse(fileInfo))
				.orElseGet(() -> Response.status(404).build());
	}
	
	@GET
	@Path("get/{fileid}/{entry: .+}")
	public Response download(@PathParam("fileid") String fileId, @PathParam("entry") String entryName) {
		return this.fileInfoRepository.findZipEntry(fileId, entryName)
				.map(fileInfo -> this.buildFileResponseOfEntry(fileInfo))
				.orElseGet(() -> Response.status(404).build());
	}

	private Response buildFileResponse(StoredFileInfo fileInfo) {
		
		val fileInfoOpt = FileStereoTypeDescriptionExtend.of(fileInfo.getFileType());
		if (fileInfoOpt.isPresent()) {
			if (!fileInfoOpt.get().isFileOrKeepedPack()) {
				return Response.status(404).build();
			}
		}
		
		return Response.ok()
				.entity(new StreamingOutputFile(() -> this.getInputStream(fileInfo)))
				.encoding("UTF-8")
				.header("Content-Disposition", Helper.contentDisposition(fileInfo))
				.build();
	}

	private Response buildFileResponseOfEntry(StoredFileInfo entryFileInfo) {
		
		return Response.ok()
				.entity(new StreamingOutputFile(() -> this.getInputStream(entryFileInfo)))
				.encoding("UTF-8")
				.build();
	}

	private InputStream getInputStream(StoredFileInfo fileInfo) {
		if (fileInfo.isTemporary()) {
			this.fileInfoRepository.delete(fileInfo.getId());
			return this.fileStreamService.takeOutDeleteOnClosed(fileInfo);
		} else {
			return this.fileStreamService.takeOut(fileInfo);
		}
	}

	@GET
	@Path("liveview/{fileid}")
	public Response liveview(@PathParam("fileid") String fileId) {
		return this.fileInfoRepository.find(fileId)
				.map(fileInfo -> this.buildFileResponseInLine(fileInfo))
				.orElseThrow(() -> new RuntimeException("stored file info is not found."));
	}
	
	@GET
	@Path("liveview/{fileid}/{entry: .+}")
	public Response liveviewZipEntry(@PathParam("fileid") String fileId, @PathParam("entry") String entryName) {
		return this.fileInfoRepository.findZipEntry(fileId, entryName)
				.map(fileInfo -> this.buildFileResponseInLine(fileInfo))
				.orElseThrow(() -> new RuntimeException("File not found."));
	}

	private Response buildFileResponseInLine(StoredFileInfo fileInfo) {
		val fileInputStream = this.getInputStream(fileInfo);
		return Response.ok(fileInputStream, fileInfo.getMimeType())
				.encoding("UTF-8")
				.header("Content-Disposition", "inline")
				.build();
	}

	@POST
	@Path("infor/{fileid}")
	public StoredFileInfo getFileInfor(@PathParam("fileid") String fileId) {
		return this.fileInfoRepository.find(fileId)
				.orElseThrow(() -> new RuntimeException("stored file info is not found."));
	}
	
	@POST
	@Path("infor/{fileid}/{entry}")
	public StoredFileInfo getZipEntryInfo(@PathParam("fileid") String fileId, @PathParam("entry") String entryName) {
		return this.fileInfoRepository.findZipEntry(fileId, entryName)
				.orElseThrow(() -> new RuntimeException("File not found."));
	}

	@POST
	@Path("isexist/{fileid}")
	public boolean checkFileExist(@PathParam("fileid") String fileId) {
		return this.fileInfoRepository.find(fileId).isPresent();
	}
	
	@POST
	@Path("isexist/{fileid}/{entry}")
	public boolean zipEntryExists(@PathParam("fileid") String fileId, @PathParam("entry") String entryName) {
		return this.fileInfoRepository.findZipEntry(fileId, entryName).isPresent();
	}

	@POST
	@Path("delete/{fileid}")
	public void delete(@PathParam("fileid") String fileId) {
		this.fileStorage.delete(fileId);
	}
}
