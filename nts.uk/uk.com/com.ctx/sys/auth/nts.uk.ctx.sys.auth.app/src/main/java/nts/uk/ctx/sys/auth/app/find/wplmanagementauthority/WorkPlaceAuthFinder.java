package nts.uk.ctx.sys.auth.app.find.wplmanagementauthority;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.app.find.wplmanagementauthority.dto.WorkPlaceAuthDto;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.domservice.WorkPlaceAuthDomService;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class WorkPlaceAuthFinder {

	@Inject
	private WorkPlaceAuthDomService wplAuthDomService;

	public List<WorkPlaceAuthDto> getList(String roleId) {
		String companyId = AppContexts.user().companyId();
		return wplAuthDomService.getList(companyId, roleId).stream().map(o -> new WorkPlaceAuthDto(o))
				.collect(Collectors.toList());
	}

}
