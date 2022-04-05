package nts.uk.ctx.sys.auth.ws.grant.roleindividual;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.auth.app.find.grant.roleindividual.RoleIndividualComDto;
import nts.uk.ctx.sys.auth.app.find.grant.roleindividual.RoleIndividualComFinder;

@Path("ctx/sys/auth/grant/roleindividualCom")
@Produces("application/json")
public class RoleIndividualComWebService extends WebService {

	@Inject
	private RoleIndividualComFinder roleIndividualComFinder;

	@POST
	@Path("findAll")
	private RoleIndividualComDto getAllRoleIndividualCom() {
		return this.roleIndividualComFinder.getScreenResult(1);

	}

}
