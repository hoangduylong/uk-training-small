package nts.uk.shr.infra.file.storage;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.error.BusinessException;
import nts.arc.i18n.I18NText;
import nts.arc.layer.app.file.storage.FileStorage;
import nts.arc.layer.app.file.storage.StoredFileInfo;
import nts.arc.layer.infra.file.storage.DefaultFileStorage;
import nts.gul.file.FileUtil;
import nts.uk.shr.infra.file.storage.info.StoredFileSecurityInfo;
import nts.uk.shr.infra.file.storage.info.StoredFileSecurityInfoRepository;
import nts.uk.shr.infra.file.storage.info.StoredPackInfoRepository;
import nts.uk.shr.infra.file.storage.info.UkStoredFileInfo;

@Stateless
public class UkFileStorage extends DefaultFileStorage implements FileStorage {

	@Inject
	private StoredFileSecurityInfoRepository securityRepository;
	
	@Inject
	private StoredPackInfoRepository packInfoRepository;
	
	@Override
	public Optional<StoredFileInfo> getInfo(String fileId) {

		val optionalFileInfo = super.getInfo(fileId);
		
		optionalFileInfo.ifPresent(fileInfo -> {
			this.securityRepository.find(fileId).ifPresent(securityInfo -> {
				new UkStoredFileInfo(fileInfo, securityInfo).checkIfCanTakeOut();
			});
		});
		
		return optionalFileInfo;
	}
	
	
	@Override
	protected void persist(Path pathToSource, StoredFileInfo fileInfo) {
		
		val securityInfo = StoredFileSecurityInfo.createForLoginUser(fileInfo.getId());
		val ukFileInfo = new UkStoredFileInfo(fileInfo, securityInfo);
		ukFileInfo.checkIfCanStore();
		
		// セキュリティ情報は、梱包ファイルの保存有無に関わらず記録する
		// 梱包ファイル内エントリについては記録しない（梱包ファイル自体と同じであるため）
		this.securityRepository.add(securityInfo);

		if (ukFileInfo.isPack()) {
			this.persistPack(pathToSource, ukFileInfo);
		} else {
			this.fileInfoRepository.add(fileInfo);
			this.persistSingleStream(ukFileInfo, pathToSource);
		}
	}


	private void persistPack(Path pathToSource, UkStoredFileInfo ukFileInfo) {
		if (ukFileInfo.keepsPack()) {
			// 梱包ファイル自体を保存する
			this.fileInfoRepository.add(ukFileInfo.getFileInfo());
			this.persistSingleStream(ukFileInfo, pathToSource);
		}
		
		this.persistPackkedContents(ukFileInfo, pathToSource);
	}

	private void persistSingleStream(UkStoredFileInfo fileInfo, Path pathToSource) {
		try (val streamToStore = Files.newInputStream(pathToSource)) {
			this.fileStreamService.store(fileInfo.getFileInfo(), streamToStore);
		} catch (IOException e) {
			e.printStackTrace();
			throw new BusinessException(I18NText.main("Msg_878").addRaw("STORE_STREAM").build());
		}
	}

	private void persistPackkedContents(UkStoredFileInfo packFileInfo, Path pathToSource) {
		
		File source = pathToSource.toFile();
		
		if (!FileUtil.isZip(pathToSource.toFile(), packFileInfo.getFileName())) {
			throw new BusinessException("Msg_886");
		}
		
		try (val zipFile = new ZipFile(source)) {
			zipFile.stream().forEach(entry -> {
				this.persistPackedEntry(packFileInfo, zipFile, entry);
			});
		} catch (IOException e) {
			e.printStackTrace();
			throw new BusinessException(I18NText.main("Msg_877").addRaw("READ_ZIP").build());
		}
	}

	private void persistPackedEntry(UkStoredFileInfo packFileInfo, ZipFile zipFile, ZipEntry entry) {
		
		try (InputStream is = zipFile.getInputStream(entry)) {
			val entryInfo = packFileInfo.getFileInfo().createZipEntryInfo(entry.getName(), entry.getSize());
			this.fileInfoRepository.add(entryInfo);
			this.packInfoRepository.add(packFileInfo.getId(), entryInfo.getId(), entryInfo.getOriginalName());
			this.fileStreamService.storeZipEntry(entryInfo, is);
		} catch (IOException e) {
			e.printStackTrace();
			throw new BusinessException(I18NText.main("Msg_877").addRaw("ZIP_ENTRY").build());
		}
	}
}
