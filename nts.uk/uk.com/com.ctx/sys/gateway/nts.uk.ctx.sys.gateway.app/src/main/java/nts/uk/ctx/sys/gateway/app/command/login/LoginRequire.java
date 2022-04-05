package nts.uk.ctx.sys.gateway.app.command.login;

import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.gateway.app.command.login.session.LoginAuthorizeAdapter;
import nts.uk.ctx.sys.gateway.dom.login.CheckIfCanLogin;
import nts.uk.ctx.sys.gateway.dom.login.IdentifiedEmployeeInfo;
import nts.uk.ctx.sys.gateway.dom.login.password.authenticate.PasswordAuthenticationFailureLog;
import nts.uk.ctx.sys.gateway.dom.login.password.authenticate.PasswordAuthenticationFailureLogRepository;
import nts.uk.ctx.sys.gateway.dom.outage.company.PlannedOutageByCompany;
import nts.uk.ctx.sys.gateway.dom.outage.company.PlannedOutageByCompanyRepository;
import nts.uk.ctx.sys.gateway.dom.outage.tenant.PlannedOutageByTenant;
import nts.uk.ctx.sys.gateway.dom.outage.tenant.PlannedOutageByTenantRepository;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.AccountLockPolicy;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.AccountLockPolicyRepository;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockOutDataRepository;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockoutData;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthentication;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthenticationFailureLog;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthenticationFailureLogRepository;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthenticationRepository;
import nts.uk.ctx.sys.shared.dom.company.CompanyInforImport;
import nts.uk.ctx.sys.shared.dom.company.CompanyInformationAdapter;
import nts.uk.ctx.sys.shared.dom.employee.employment.SyaEmpHistAdapter;
import nts.uk.ctx.sys.shared.dom.employee.employment.SyaEmpHistImport;
import nts.uk.ctx.sys.shared.dom.employee.sycompany.SyaCompanyHistAdapter;
import nts.uk.ctx.sys.shared.dom.employee.sycompany.SyaCompanyHistImport;
import nts.uk.ctx.sys.shared.dom.employee.syjobtitle.SyaJobHistAdapter;
import nts.uk.ctx.sys.shared.dom.employee.syjobtitle.SyaJobHistImport;
import nts.uk.ctx.sys.shared.dom.employee.syworkplace.SyaWkpHistAdapter;
import nts.uk.ctx.sys.shared.dom.employee.syworkplace.SyaWkpHistImport;
import nts.uk.shr.com.context.loginuser.LoginUserContextManager;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

@Stateless
public class LoginRequire {
	
	@Inject
	private CompanyInformationAdapter companyInformationAdapter;
	
	@Inject
    private TenantAuthenticationRepository tenantAuthenticationRepo;

	@Inject
	private LoginAuthorizeAdapter loginAuthorizeAdapter;
	
	@Inject
	private LoginUserContextManager loginUserContextManager;

	@Inject
	private PlannedOutageByTenantRepository plannedOutageByTenantRepo;
	
	@Inject
	private PlannedOutageByCompanyRepository plannedOutageByCompanyRepo;
	
	@Inject
	private AccountLockPolicyRepository accountLockPolicyRepo;
	
	@Inject
	private LockOutDataRepository lockOutDataRep;
	
	@Inject
	private TenantAuthenticationFailureLogRepository tenantAuthenticationFailureLogRepo;
	
	@Inject
	private PasswordAuthenticationFailureLogRepository passwordAuthenticateFailureLogRepo;
	
	@Inject
	private SyaCompanyHistAdapter syaCompanyHistAdapter;
	
	@Inject
	private SyaEmpHistAdapter syaEmpHistAdapter;
	
	@Inject
	private SyaJobHistAdapter syaJobHistAdapter;

	@Inject
	private SyaWkpHistAdapter syaWkpHistAdapter;


	/**
	 * 社員に紐付かないユーザのログイン用
	 * @param require
	 */
	public <R extends LoginRequire.BaseImpl> void setup(R require) {
		
		require.setDependencies(
				companyInformationAdapter,
				tenantAuthenticationRepo,
				loginAuthorizeAdapter,
				loginUserContextManager,
				plannedOutageByTenantRepo,
				plannedOutageByCompanyRepo, 
				accountLockPolicyRepo, 
				lockOutDataRep, 
				tenantAuthenticationFailureLogRepo, 
				passwordAuthenticateFailureLogRepo, 
				syaCompanyHistAdapter, 
				syaEmpHistAdapter, 
				syaJobHistAdapter, 
				syaWkpHistAdapter);
	}

	public static interface CommonRequire extends
		LoginCommandHandlerBase.Require,
		CheckIfCanLogin.Require {
		
	}
	
	public static class BaseImpl implements CommonRequire {

		private CompanyInformationAdapter companyInformationAdapter;
		private TenantAuthenticationRepository tenantAuthenticationRepo;
		private LoginAuthorizeAdapter loginAuthorizeAdapter;
		private LoginUserContextManager loginUserContextManager;
		
		private PlannedOutageByTenantRepository plannedOutageByTenantRepo;
		private PlannedOutageByCompanyRepository plannedOutageByCompanyRepo;
		private AccountLockPolicyRepository accountLockPolicyRepo;
		private LockOutDataRepository lockOutDataRepo;
		private TenantAuthenticationFailureLogRepository tenantAuthenticationFailureLogRepo;
		private PasswordAuthenticationFailureLogRepository passwordAuthenticateFailureLogRepo;
		
		private SyaCompanyHistAdapter syaCompanyHistAdapter;
		private SyaEmpHistAdapter syaEmpHistAdapter;
		private SyaJobHistAdapter syaJobHistAdapter;
		private SyaWkpHistAdapter syaWkpHistAdapter;
		

		public void setDependencies(
				CompanyInformationAdapter companyInformationAdapter, 
				TenantAuthenticationRepository tenantAuthenticationRepo, 
				LoginAuthorizeAdapter loginAuthorizeAdapter,
				LoginUserContextManager loginUserContextManager, 
				PlannedOutageByTenantRepository plannedOutageByTenantRepo,
				PlannedOutageByCompanyRepository plannedOutageByCompanyRepo, 
				AccountLockPolicyRepository accountLockPolicyRepo, 
				LockOutDataRepository lockOutDataRepo, 
				TenantAuthenticationFailureLogRepository tenantAuthenticationFailureLogRepo, 
				PasswordAuthenticationFailureLogRepository passwordAuthenticateFailureLogRepo, 
				
				SyaCompanyHistAdapter syaCompanyHistAdapter, 
				SyaEmpHistAdapter syaEmpHistAdapter, 
				SyaJobHistAdapter syaJobHistAdapter, 
				SyaWkpHistAdapter syaWkpHistAdapter) {

			this.companyInformationAdapter = companyInformationAdapter;
			this.tenantAuthenticationRepo = tenantAuthenticationRepo;
			this.loginAuthorizeAdapter = loginAuthorizeAdapter;
			this.loginUserContextManager = loginUserContextManager;
			this.plannedOutageByTenantRepo = plannedOutageByTenantRepo;
			this.plannedOutageByCompanyRepo = plannedOutageByCompanyRepo;
			this.accountLockPolicyRepo = accountLockPolicyRepo;
			this.lockOutDataRepo = lockOutDataRepo;
			this.tenantAuthenticationFailureLogRepo = tenantAuthenticationFailureLogRepo;
			this.passwordAuthenticateFailureLogRepo = passwordAuthenticateFailureLogRepo;
			this.syaCompanyHistAdapter = syaCompanyHistAdapter;
			this.syaEmpHistAdapter = syaEmpHistAdapter;
			this.syaJobHistAdapter = syaJobHistAdapter;
			this.syaWkpHistAdapter = syaWkpHistAdapter;
		}

		@Override
		public CompanyInforImport getCompanyInforImport(String companyId) {
			return companyInformationAdapter.findComById(companyId);
		}

		@Override
		public Optional<PlannedOutageByTenant> getPlannedOutageByTenant(String tenantCode) {
			return plannedOutageByTenantRepo.find(tenantCode);
		}

		@Override
		public Optional<PlannedOutageByCompany> getPlannedOutageByCompany(String companyId) {
			return plannedOutageByCompanyRepo.find(companyId);
		}
		
		@Override
		public LoginUserRoles getLoginUserRoles(String userId) {
			return loginAuthorizeAdapter.buildUserRoles(userId);
		}

		@Override
		public Optional<AccountLockPolicy> getAccountLockPolicy(String tenantCode) {
			return accountLockPolicyRepo.getAccountLockPolicy(tenantCode);
		}

		@Override
		public List<PasswordAuthenticationFailureLog> getFailureLog(String userId) {
			return passwordAuthenticateFailureLogRepo.find(userId);
		}

		@Override
		public List<PasswordAuthenticationFailureLog> getFailureLog(String userId, GeneralDateTime start, GeneralDateTime end) {
			return passwordAuthenticateFailureLogRepo.find(userId, start, end);
		}

		@Override
		public Optional<LockoutData> getLockOutData(String userId) {
			return lockOutDataRepo.find(userId);
		}

		@Override
		public Optional<TenantAuthentication> getTenantAuthentication(String tenantCode) {
			return tenantAuthenticationRepo.find(tenantCode);
		}

		@Override
		public void insert(TenantAuthenticationFailureLog failureLog) {
			tenantAuthenticationFailureLogRepo.insert(failureLog);
			
		}

		@Override
		public Optional<SyaCompanyHistImport> getCompanyHist(String employeeId, GeneralDate date) {
			return syaCompanyHistAdapter.find(employeeId, date);
		}

		@Override
		public Optional<SyaEmpHistImport> getEmploymentHist(String companyId, String employeeId, GeneralDate date) {
			return syaEmpHistAdapter.findBySid(companyId, employeeId, date);
		}

		@Override
		public Optional<SyaJobHistImport> getJobtitleHist(String companyId, String employeeId, GeneralDate date) {
			return syaJobHistAdapter.findBySid(companyId, employeeId, date);
		}

		@Override
		public Optional<SyaWkpHistImport> getWorkplaceHist(String companyId, String employeeId, GeneralDate date) {
			return syaWkpHistAdapter.findBySid(companyId, employeeId, date);
		}

		@Override
		public void authorizeLoginSession(IdentifiedEmployeeInfo identified) {
			val CompanyInforImport =  getCompanyInforImport(identified.getCompanyId());
			loginUserContextManager.loggedInAsEmployee(
					identified.getUserId(),
					identified.getUser().getAssociatedPersonID().get(),
					identified.getTenantCode(),
					identified.getCompanyId(),
					CompanyInforImport.getCompanyCode(),
					identified.getEmployeeId(),
					identified.getEmployee().getEmployeeCode());
			
			loginAuthorizeAdapter.authorize(
					loginUserContextManager.roleIdSetter(),
					identified.getUserId());
		}
	}
}
