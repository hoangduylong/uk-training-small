package nts.uk.shr.infra.file.upload;

import java.util.Arrays;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.layer.app.file.storage.FileStorage;
import nts.arc.layer.app.file.storage.StoredFileInfo;

@Stateless
public class UploadedFileStorage {

	@Inject
	private FileStorage fileStorage;
	
	public List<StoredFileInfo> store(UploadedFile uploadedFile) {
		
		val fileInfo = fileStorage.store(
				uploadedFile.path(),
				uploadedFile.name(),
				uploadedFile.stereoType());

		return Arrays.asList(fileInfo);
	}
}
