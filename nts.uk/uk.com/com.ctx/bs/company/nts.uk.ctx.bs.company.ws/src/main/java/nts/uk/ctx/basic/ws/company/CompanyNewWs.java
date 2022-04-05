package nts.uk.ctx.basic.ws.company;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.company.app.find.company.CompanyInforDto;
import nts.uk.ctx.bs.company.app.find.company.CompanyInforFinder;

@Path("bs/company")
@Produces("application/json")
public class CompanyNewWs extends WebService {
	@Inject
	private CompanyInforFinder finderComFinder;

	/**
	 * find all company
	 * 
	 * @return
	 */
	@POST 
	@Path("findCom") 
	public List<CompanyInforDto> findAll() {
		return this.finderComFinder.findAll();
	}

	/**
	 * find company by id
	 * 
	 * @return
	 */
	@POST
	@Path("findComId/{companyId}")
	public CompanyInforDto find(@PathParam("companyId") String companyId) {
		return this.finderComFinder.find(companyId);
	}
}
