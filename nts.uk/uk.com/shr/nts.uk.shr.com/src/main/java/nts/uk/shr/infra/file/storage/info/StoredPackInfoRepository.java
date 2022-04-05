package nts.uk.shr.infra.file.storage.info;

import java.util.Optional;

public interface StoredPackInfoRepository {

	void add(String packId, String packedEntryId, String entryFileName);
	
	Optional<String> getPackId(String packedEntryId);
}
