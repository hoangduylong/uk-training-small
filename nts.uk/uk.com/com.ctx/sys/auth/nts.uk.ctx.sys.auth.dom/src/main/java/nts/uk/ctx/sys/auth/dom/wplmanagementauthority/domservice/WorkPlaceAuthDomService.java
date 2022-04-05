package nts.uk.ctx.sys.auth.dom.wplmanagementauthority.domservice;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthority;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthorityRepository;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceFunction;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceFunctionRepository;

@Stateless
public class WorkPlaceAuthDomService {

	@Inject
	private WorkPlaceFunctionRepository wplFunctionRepo;

	@Inject
	public WorkPlaceAuthorityRepository wplAuthRepo;

	public List<WorkPlaceAuthObject> getList(String companyId, String roleId) {
		List<WorkPlaceFunction> wplFunctions = wplFunctionRepo.getAllWorkPlaceFunction();
		Map<Integer, WorkPlaceAuthority> wplAuthMap = wplAuthRepo.getAllWorkPlaceAuthorityByRoleId(companyId, roleId)
				.stream().collect(Collectors.toMap(x -> x.getFunctionNo().v(), x -> x));
		return wplFunctions.stream().map(desc -> {
			WorkPlaceAuthority auth = wplAuthMap.get(desc.getFunctionNo().v());
			if (auth != null) {
				return new WorkPlaceAuthObject(desc, auth);
			} else {
				return new WorkPlaceAuthObject(desc);
			}
		}).collect(Collectors.toList());

	}

}
