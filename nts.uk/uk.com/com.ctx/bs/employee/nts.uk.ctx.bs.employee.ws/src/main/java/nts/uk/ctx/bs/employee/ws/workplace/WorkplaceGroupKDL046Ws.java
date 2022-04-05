package nts.uk.ctx.bs.employee.ws.workplace;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.app.find.employeeinfo.workplacegroup.WorkplaceGroupFinder;
import nts.uk.ctx.bs.employee.app.find.employeeinfo.workplacegroup.WorkplaceGroupInforDto;

@Path("bs/employee/kdl046")
@Produces("application/json")
public class WorkplaceGroupKDL046Ws extends WebService {
	
	@Inject
	private WorkplaceGroupFinder finder;
	
	@POST
	@Path("getData")
	public Map<String, WorkplaceGroupInforDto> getAllActiveWorkplace(List<String> workplaceIds) {
		return finder.getWorkplaceGroupKDL046(workplaceIds);
	}
}
