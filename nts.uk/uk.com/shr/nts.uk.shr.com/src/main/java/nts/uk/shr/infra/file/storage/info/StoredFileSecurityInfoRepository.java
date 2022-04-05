package nts.uk.shr.infra.file.storage.info;

import java.util.Optional;

public interface StoredFileSecurityInfoRepository {

	void add(StoredFileSecurityInfo securityInfo);
	
	Optional<StoredFileSecurityInfo> find(String fileId);
}
