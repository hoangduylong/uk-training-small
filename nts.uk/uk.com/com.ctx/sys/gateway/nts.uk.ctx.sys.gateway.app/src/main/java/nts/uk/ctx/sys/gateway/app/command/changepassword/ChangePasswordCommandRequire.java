package nts.uk.ctx.sys.gateway.app.command.changepassword;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import lombok.RequiredArgsConstructor;
import nts.uk.ctx.sys.gateway.app.command.changepassword.ChangePasswordCommandHandler.Require;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.LoginPasswordOfUser;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.LoginPasswordOfUserRepository;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicy;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicyRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class ChangePasswordCommandRequire {
	
	@Inject
	private PasswordPolicyRepository passwordPolicyRepo;
	
	@Inject
	private LoginPasswordOfUserRepository loginPasswordOfUserRepo;
	
	public Require createRequire() {
		return new RequireImpl();
	}
	
	@RequiredArgsConstructor
	public class RequireImpl implements Require {
		
		@Override
		public PasswordPolicy getPasswordPolicy() {
			return passwordPolicyRepo.getPasswordPolicy(AppContexts.user().contractCode());
		}
		
		@Override
		public Optional<LoginPasswordOfUser> getLoginPasswordOfUser(String userId) {
			return loginPasswordOfUserRepo.find(userId);
		}
		
		@Override
		public void save(LoginPasswordOfUser password) {
			loginPasswordOfUserRepo.save(password);
		}
	}
}
