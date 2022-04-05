package nts.uk.shr.com.permit;

public interface RestoreAvailabilityPermission {

	String companyId();
	String roleId();
	int functionNo();
	boolean isAvailable();
}
