package nts.uk.ctx.sys.gateway.ws.securitypolicy;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.uk.ctx.sys.gateway.app.command.securitypolicy.UpdateAccountPolicyCommand;
import nts.uk.ctx.sys.gateway.app.command.securitypolicy.UpdateAccountPolicyCommandHandler;
import nts.uk.ctx.sys.gateway.app.find.securitypolicy.AccountLockPolicyFinder;
import nts.uk.ctx.sys.gateway.app.find.securitypolicy.PasswordPolicyFinder;
import nts.uk.ctx.sys.gateway.app.find.securitypolicy.dto.AccountLockPolicyDto;
import nts.uk.ctx.sys.gateway.app.find.securitypolicy.dto.PasswordPolicyDto;

@Path("ctx/sys/gateway/securitypolicy")
@Produces("application/json")
@Stateless
public class AccountpolicyWebService {
	@Inject
	private AccountLockPolicyFinder accountLockPolicyFinder;
	@Inject
	private PasswordPolicyFinder passwordPolicyFinder;
	@Inject
	private UpdateAccountPolicyCommandHandler updateAccountPolicyCommandHandler;
	@POST
	@Path("getAccountLockPolicy")
	public AccountLockPolicyDto getAccountLockPolicy(){
		return this.accountLockPolicyFinder.getAccountLockPolicy();
	}
	@POST
	@Path("getPasswordPolicy")
	public PasswordPolicyDto getPasswordPolicy(){
		return this.passwordPolicyFinder.getPasswordPolicy();
	}
	@POST
	@Path("updateAccountPolicy")
	public void updateAccountPolicy(UpdateAccountPolicyCommand updateAccountPolicyCommand){
		 this.updateAccountPolicyCommandHandler.handle(updateAccountPolicyCommand);
	}
}
