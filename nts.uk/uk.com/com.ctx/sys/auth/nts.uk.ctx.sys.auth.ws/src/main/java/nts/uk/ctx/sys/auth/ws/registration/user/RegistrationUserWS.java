package nts.uk.ctx.sys.auth.ws.registration.user;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.auth.app.find.registration.user.CompanyImportDto;
import nts.uk.ctx.sys.auth.app.find.registration.user.RegistrationUserFinder;
import nts.uk.ctx.sys.auth.app.find.registration.user.UserDto;

/**
 * The Class RegistrationUserWS.
 */
@Path("ctx/sys/auth/regis/user")
@Produces("application/json")
public class RegistrationUserWS extends WebService {
	
	/** The registration user finder. */
	@Inject
	private RegistrationUserFinder registrationUserFinder;
	
	/**
	 * Find company import list.
	 *
	 * @return the list
	 */
	@POST
	@Path("getAllCom")
	public List<CompanyImportDto> findCompanyImportList() {
		return this.registrationUserFinder.getCompanyImportList();
	}
	
	/**
	 * Gets the list user.
	 *
	 * @param cid the cid
	 * @return the list user
	 */
	@POST
	@Path("getlistUser/{cid}")
	public List<UserDto> getListUser(@PathParam("cid") String cid) {
		return this.registrationUserFinder.getLoginUserListByCurrentCID(cid);
	}
	
	/**
	 * Gets the all user.
	 *
	 * @return the all user
	 */
	@POST
	@Path("getAllUser")
	public List<UserDto> getAllUser() {
		return this.registrationUserFinder.getLoginUserListByContractCode();
	}
}
