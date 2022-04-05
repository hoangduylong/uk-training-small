package nts.uk.shr.com.permit.app;

import java.util.function.Function;

import lombok.val;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.permit.AvailabilityPermissionBase;
import nts.uk.shr.com.permit.AvailabilityPermissionRepositoryBase;
import nts.uk.shr.com.permit.RestoreAvailabilityPermission;

public class SaveAvailabilityPermissionService {

	public static <D extends AvailabilityPermissionBase, R extends AvailabilityPermissionRepositoryBase<D>> void save(
			SaveAvailabilityPermissionCommand command,
			Function<RestoreAvailabilityPermission, D> createDomain,
			R repository) {

		String companyId = AppContexts.user().companyId();
		String roleId = command.getRoleId();
		
		command.createRestore(companyId).forEach(restore -> {
			val existed = repository.find(companyId, roleId, restore.functionNo());
			val domainToSave = createDomain.apply(restore);
			if (existed.isPresent()) {
				repository.update(domainToSave);
			} else {
				repository.add(domainToSave);
			}
		});
	}
}
