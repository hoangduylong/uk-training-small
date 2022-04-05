package nts.uk.shr.com.permit;

import java.util.List;
import java.util.Optional;

public interface AvailabilityPermissionRepositoryBase <T extends AvailabilityPermissionBase> {

	Optional<T> find(String companyId, String roleId, int functionNo);
	
	List<T> find(String companyId, String roleId, List<String> functionNoList);
	
	void add(T permission);
	
	void update(T permission);
}
