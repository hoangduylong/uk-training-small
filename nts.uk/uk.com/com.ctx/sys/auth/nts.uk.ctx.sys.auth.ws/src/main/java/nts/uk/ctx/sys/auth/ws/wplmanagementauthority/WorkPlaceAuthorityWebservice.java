package nts.uk.ctx.sys.auth.ws.wplmanagementauthority;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.uk.ctx.sys.auth.app.find.wplmanagementauthority.WorkPlaceAuthorityFinder;
import nts.uk.ctx.sys.auth.app.find.wplmanagementauthority.dto.InputWorkPlaceAuthority;
import nts.uk.ctx.sys.auth.app.find.wplmanagementauthority.dto.WorkPlaceAuthorityDto;


@Path("auth/wplmanagementauthority/workplaceauthority")
@Produces(MediaType.APPLICATION_JSON)
public class WorkPlaceAuthorityWebservice {
	
	@Inject
	private  WorkPlaceAuthorityFinder finder;
		
	/** Get all WorkPlaceAuthority */
	@POST
	@Path("getallWorkplaceauthority")
	public List<WorkPlaceAuthorityDto> getAllWorkPlaceAuthority(){
		 List<WorkPlaceAuthorityDto> data = this.finder.getAllWorkPlaceAuthority();
		 return data;
	}
	
	/** Get all WorkPlaceAuthority by role id */
	@POST
	@Path("getallWorkplaceauthoritybyid/{roleId}")
	public List<WorkPlaceAuthorityDto> getAllWorkPlaceAuthorityById(@PathParam("roleId") String roleId ){
		 List<WorkPlaceAuthorityDto> data = this.finder.getAllWorkPlaceAuthorityByRoleId(roleId);
		 return data;
	}
	
	/** Get WorkPlaceAuthority by id */
	@POST
	@Path("getWorkplaceauthoritybyid")
	public WorkPlaceAuthorityDto getWorkPlaceAuthorityById(InputWorkPlaceAuthority inputWorkPlaceAuthority ){
		 WorkPlaceAuthorityDto data = this.finder.getWorkPlaceAuthorityById(inputWorkPlaceAuthority);
		 return data;
	}
	
}
