package nts.uk.shr.com.security.audittrail.start;

public interface StartPageLogStorageRepository {

	void save(StartPageLog log);
	
	void delete(String operationId);
}
