package nts.uk.ctx.sys.gateway.app.command.login.password;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import lombok.RequiredArgsConstructor;
import lombok.val;
import nts.arc.diagnose.stopwatch.embed.EmbedStopwatch;
import nts.uk.ctx.sys.gateway.app.command.login.LoginRequire;
import nts.uk.ctx.sys.gateway.app.command.login.password.PasswordAuthenticateCommandHandler.Require;
import nts.uk.ctx.sys.gateway.dom.login.password.authenticate.PasswordAuthenticationFailureLog;
import nts.uk.ctx.sys.gateway.dom.login.password.authenticate.PasswordAuthenticationFailureLogRepository;
import nts.uk.ctx.sys.gateway.dom.login.password.identification.PasswordAuthIdentificationFailureLog;
import nts.uk.ctx.sys.gateway.dom.login.password.identification.PasswordAuthIdentificationFailureLogRepository;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.LoginPasswordOfUser;
import nts.uk.ctx.sys.gateway.dom.login.password.userpassword.LoginPasswordOfUserRepository;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.AccountLockPolicy;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.AccountLockPolicyRepository;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockOutDataRepository;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockoutData;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicy;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicyRepository;
import nts.uk.ctx.sys.shared.dom.company.CompanyInformationAdapter;
import nts.uk.ctx.sys.shared.dom.employee.EmployeeDataManageInfoAdapter;
import nts.uk.ctx.sys.shared.dom.employee.EmployeeDataMngInfoImport;
import nts.uk.ctx.sys.shared.dom.user.User;
import nts.uk.ctx.sys.shared.dom.user.UserRepository;
import nts.uk.ctx.sys.shared.dom.user.builtin.BuiltInUser;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class PasswordAuthenticateCommandRequire {

	@Inject
	private LoginRequire loginRequire;

	@Inject
	private CompanyInformationAdapter companyInformationAdapter;

	@Inject
	private EmployeeDataManageInfoAdapter employeeDataManageInfoAdapter;
	
	@Inject
	private UserRepository userRepo;
	
	@Inject
	private PasswordPolicyRepository passwordPolicyRepo;
	
	@Inject
	private PasswordAuthenticationFailureLogRepository passwordAuthenticateFailuresLogRepo;
	
	@Inject
	private PasswordAuthIdentificationFailureLogRepository passwordAuthIdentificateFailureLogRepo;

	@Inject
	private LockOutDataRepository lockOutDataRepo;
	
	@Inject
	private AccountLockPolicyRepository accountLockPolicyRepo;
	
	@Inject
	private LoginPasswordOfUserRepository loginPasswordOfUserRepo;
	
	
	public Require createRequire(String tenantCode) {

		val require = new RequireImpl();
		loginRequire.setup(require);
		return EmbedStopwatch.embed(require);

	}

	@RequiredArgsConstructor
	public class RequireImpl extends LoginRequire.BaseImpl implements Require {

		@Override
		public String createCompanyId(String tenantCode, String companyCode) {
			return companyInformationAdapter.createCompanyId(tenantCode, companyCode);
		}

		@Override
		public Optional<EmployeeDataMngInfoImport> getEmployeeDataMngInfoImportByEmployeeCode(String companyId,
				String employeeCode) {
			return employeeDataManageInfoAdapter.findByEmployeeCode(companyId, employeeCode);
		}

		@Override
		public BuiltInUser getBuiltInUser(String tenantCode, String companyId) {
			return new BuiltInUser();
		}

		@Override
		public Optional<User> getUserByPersonId(String personId) {
			return userRepo.getByAssociatedPersonId(personId);
		}

		@Override
		public PasswordPolicy getPasswordPolicy(String tenantCode) {
			return passwordPolicyRepo.getPasswordPolicy(tenantCode);
		}

		@Override
		public Optional<AccountLockPolicy> getAccountLockPolicy(String contractCode) {
			return accountLockPolicyRepo.getAccountLockPolicy(contractCode);
		}

		@Override
		public void save(LockoutData lockOutData) {
			lockOutDataRepo.add(lockOutData);
		}
		
		@Override
		public Optional<LockoutData> getLockOutData(String userId) {
			return lockOutDataRepo.find(userId);
		}

		@Override
		public Optional<LoginPasswordOfUser> getLoginPasswordOfUser(String userId) {
			return loginPasswordOfUserRepo.find(userId);
		}

		@Override
		public void addFailureLog(PasswordAuthIdentificationFailureLog failurLog) {
			passwordAuthIdentificateFailureLogRepo.insert(failurLog);
		}

		@Override
		public void save(PasswordAuthenticationFailureLog failuresLog) {
			passwordAuthenticateFailuresLogRepo.insert(failuresLog);
		}
	}

}
