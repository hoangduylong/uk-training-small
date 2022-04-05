package nts.uk.ctx.sys.auth.ws.employeeInfo;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.uk.ctx.sys.auth.app.find.employeeinfo.EmployeeInfoDto;
import nts.uk.ctx.sys.auth.app.find.employeeinfo.EmployeeInfomationFinder;

@Path("ctx/sys/auth/ws/employeeInfo")
@Produces("application/json")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
public class EmployeeInfoWebService {

	/** The finder. */
	@Inject
	private EmployeeInfomationFinder finder;
	
	/**
	 * Gets the employees at work by base date.
	 *
	 * @param companyId the company id
	 * @return the employees at work by base date
	 */
	@POST
	@Path("findEmployeesByCId")
	public List<EmployeeInfoDto> getEmployeesAtWorkByBaseDate(String companyId){
		return this.finder.getEmployeesAtWorkByBaseDate(companyId);
	}
}
