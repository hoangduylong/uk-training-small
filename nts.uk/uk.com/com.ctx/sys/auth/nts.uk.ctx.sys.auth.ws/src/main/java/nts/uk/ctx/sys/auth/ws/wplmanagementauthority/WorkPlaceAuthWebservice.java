package nts.uk.ctx.sys.auth.ws.wplmanagementauthority;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.uk.ctx.sys.auth.app.find.wplmanagementauthority.WorkPlaceAuthFinder;
import nts.uk.ctx.sys.auth.app.find.wplmanagementauthority.dto.WorkPlaceAuthDto;

@Path("sys/auth/workplace")
@Produces(MediaType.APPLICATION_JSON)
public class WorkPlaceAuthWebservice {

	@Inject
	private WorkPlaceAuthFinder finder;

	@POST
	@Path("get-list")
	public List<WorkPlaceAuthDto> getAllWorkPlaceAuthority(String roleId) {
		return finder.getList(roleId);
	}

}
