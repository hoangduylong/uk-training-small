package nts.uk.ctx.bs.employee.ws.setting.code;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.app.find.employee.setting.code.EmployeeCodeSettingDto;
import nts.uk.ctx.bs.employee.app.find.employee.setting.code.EmployeeCodeSettingFinder;

@Path("bs/employee/setting/code")
@Produces(MediaType.APPLICATION_JSON)
public class EmployeeCESettingWebService extends WebService {
	
	@Inject
	private EmployeeCodeSettingFinder settingFinder;

	@Path("find")
	@POST
	public EmployeeCodeSettingDto find() {
		return settingFinder.find().orElse(new EmployeeCodeSettingDto());
	}
}
