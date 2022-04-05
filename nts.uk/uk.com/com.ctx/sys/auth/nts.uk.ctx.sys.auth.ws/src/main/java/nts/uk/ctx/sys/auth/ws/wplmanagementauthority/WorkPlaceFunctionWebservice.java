package nts.uk.ctx.sys.auth.ws.wplmanagementauthority;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.uk.ctx.sys.auth.app.find.wplmanagementauthority.WorkPlaceFunctionFinder;
import nts.uk.ctx.sys.auth.app.find.wplmanagementauthority.dto.WorkPlaceFunctionDto;

@Path("auth/wplmanagementauthority/workplacefunction")
@Produces(MediaType.APPLICATION_JSON)
public class WorkPlaceFunctionWebservice {
	
	@Inject
	private WorkPlaceFunctionFinder finder; 
	
	@POST
	@Path("getlistworkplacefunction")
	public List<WorkPlaceFunctionDto> getAllWorkPlaceFunction(){
		List<WorkPlaceFunctionDto> data = this.finder.getAllWorkPlaceFunction();
		return data;
	}
	
	@POST
	@Path("getworkplacefunction/{functionNo}")
	public WorkPlaceFunctionDto getWorkPlaceFunctionById(@PathParam("functionNo") int functionNo ){
		WorkPlaceFunctionDto data = this.finder.getWorkPlaceFunctionById(functionNo);
		return data;
	}

}
