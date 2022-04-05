package nts.uk.shr.com.permit;

import java.util.List;

public interface DescriptionOfAvailabilityPermissionRepositoryBase <T extends DescriptionOfAvailabilityPermissionBase> {

	T find(int functionNo);
	
	List<T> findAll();
}
