package nts.uk.ctx.sys.gateway.app.command.login.password.userpassword;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import lombok.RequiredArgsConstructor;
import nts.arc.diagnose.stopwatch.embed.EmbedStopwatch;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.ChangeLoginPasswordOfUser.Require;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.LoginPasswordOfUser;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.LoginPasswordOfUserRepository;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicy;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicyRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class ChangeLoginPasswordCommandRequire {
	
	@Inject
	private PasswordPolicyRepository passwordPolicyRepo;
	
	@Inject
	private LoginPasswordOfUserRepository loginPasswordOfUserRepo;
	
	public Require create() {
		return EmbedStopwatch.embed(new RequireImpl());
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
