package nts.uk.shr.infra.file.storage.filestereotype;

import java.util.Collections;
import java.util.List;

import nts.arc.layer.app.file.storage.StoredFileInfo;
import nts.uk.shr.infra.file.storage.info.StoredFileSecurityInfo;

public interface FileStereoTypeDescription {
	
	String name();
	
	default List<String> acceptableExtensions() {
		return Collections.emptyList();
	}
	
	default boolean isPack() {
		return false;
	}
	
	default boolean keepsPack() {
		return false;
	}
	
	default void checkIfCanStore(StoredFileInfo fileInfo, StoredFileSecurityInfo securityInfo) {
	}
	
	default void checkIfCanTakeOut(StoredFileInfo fileInfo, StoredFileSecurityInfo securityInfo) {
	}
	
	default void checkIfCanDelete(StoredFileInfo fileInfo, StoredFileSecurityInfo securityInfo) {
	}
}
