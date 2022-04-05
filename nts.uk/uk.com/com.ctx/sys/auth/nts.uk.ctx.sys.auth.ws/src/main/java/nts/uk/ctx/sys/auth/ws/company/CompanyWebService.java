package nts.uk.ctx.sys.auth.ws.company;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.auth.app.find.company.CompanyDto;
import nts.uk.ctx.sys.auth.app.find.company.CompanyInfomationFinder;

@Path("ctx/sys/auth/ws/company")
@Produces("application/json")
public class CompanyWebService extends WebService {

	/** The finder. */
	@Inject
	private CompanyInfomationFinder finder;

	/**
	 * Gets the company list.
	 *
	 * @return the company list
	 */
	@POST
	@Path("getCompanyList")
	public List<CompanyDto> getCompanyList() {
		return this.finder.getCompanyList();
	}
}
