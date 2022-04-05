package nts.uk.shr.infra.file.storage.info;

import java.util.Optional;

import lombok.Value;

@Value
public class StoredFileOwner {

	private final String contractCode;
	private final String userId;
	private final Optional<String> companyId;
	private final Optional<String> employeeId;
}
