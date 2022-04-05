package nts.uk.ctx.sys.gateway.app.command.login.password;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.arc.task.tran.TransactionService;
import nts.uk.ctx.sys.gateway.app.command.login.LoginCommandHandlerBase;
import nts.uk.ctx.sys.gateway.dom.login.password.authenticate.PasswordAuthenticateWithEmployeeCode;
import nts.uk.ctx.sys.gateway.dom.login.password.authenticate.PasswordAuthenticationResult;
import nts.uk.ctx.sys.gateway.dom.login.password.identification.EmployeeIdentify;
import nts.uk.ctx.sys.gateway.dom.login.password.identification.IdentificationResult;
import nts.uk.shr.com.system.config.SystemConfiguration;
import nts.uk.shr.com.system.property.UKServerSystemProperties;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class PasswordAuthenticateCommandHandler extends LoginCommandHandlerBase<
															PasswordAuthenticateCommand, 
															AuthenticationResult,
															CheckChangePassDto, 
															PasswordAuthenticateCommandHandler.Require> {
	
	@Inject
	private TransactionService transaction;
	
	@Inject
	private PasswordAuthenticateCommandRequire requireProvider;
	
	@Inject
	private LoginBuiltInUser loginBuiltInUser;
	
	@Override
	protected Require getRequire(PasswordAuthenticateCommand command) {
		return requireProvider.createRequire(getTenantCode(command));
	}
	
	/**
	 * テナント認証失敗時の処理
	 */
	@Override
	protected CheckChangePassDto tenantAuthencationFailed() {
		return CheckChangePassDto.failedToAuthTenant();
	}
	
	/**
	 * 認証処理本体
	 */
	@Override
	protected AuthenticationResult authenticate(Require require, PasswordAuthenticateCommand command) {
		
		// 入力チェック
		command.checkInput();
		
		String tenantCode = getTenantCode(command);
		String companyId = require.createCompanyId(tenantCode, command.getCompanyCode());
		String employeeCode = command.getEmployeeCode();
		String password = command.getPassword();
		
		// ビルトインユーザはこちらへ
		if (require.getBuiltInUser(tenantCode, companyId).authenticate(employeeCode, password)) {
			return AuthenticationResult.asBuiltInUser(tenantCode, companyId);
		}
		
		// ログイン社員の識別
		IdentificationResult idenResult = EmployeeIdentify.identifyByEmployeeCode(require, companyId, employeeCode);
		
		if(idenResult.isFailure()) {
			transaction.execute(idenResult.getAtomTask());
			return AuthenticationResult.identificationFailure(idenResult);
		}
		
		// パスワード認証
		PasswordAuthenticationResult passAuthResult = PasswordAuthenticateWithEmployeeCode.authenticate(
				require, 
				idenResult.getEmployeeInfo(), 
				password);
				
		if(passAuthResult.isFailure()) {
			transaction.execute(passAuthResult.getAtomTask());
			return AuthenticationResult.passAuthenticateFailure(idenResult, passAuthResult);
		}
			
		return AuthenticationResult.success(idenResult, passAuthResult);
	}

	
	@Inject
	private SystemConfiguration systemConfig;
	
	private String getTenantCode(PasswordAuthenticateCommand command) {
		
		return UKServerSystemProperties.isCloud()
				? command.getTenantCode()
				: systemConfig.getTenantCodeOnPremise().get();
	}
	
	/**
	 * ビルトインユーザのための処理を組み込むためにoverride
	 */
	@Override
	protected Optional<String> authorize(Require require, AuthenticationResult authen) {
		
		if (authen.isBuiltInUser()) {
			loginBuiltInUser.login(
					require,
					authen.getTenantCodeForBuiltInUser(),
					authen.getCompanyIdForBuiltInUser());
			return Optional.empty();
		}
		
		// 通常はsuper側に任せる
		return super.authorize(require, authen);
	}
	
	/**
	 * 認証失敗時の処理
	 */
	@Override
	protected CheckChangePassDto authenticationFailed(Require require, AuthenticationResult authen) {
		
		if(!authen.getEmployeeInfo().isPresent()) {
			// 識別失敗
			return CheckChangePassDto.failedToIdentificate();
		}
		else {
			// 認証失敗
			return CheckChangePassDto.failedToAuthPassword();
		}
	}

	/**
	 * ログイン成功時の処理
	 */
	@Override
	protected CheckChangePassDto loginCompleted(Require require, AuthenticationResult authen, Optional<String> msg) {
		return CheckChangePassDto.successToAuthPassword(authen, msg);
	}

	public static interface Require extends PasswordAuthenticateWithEmployeeCode.Require,
											LoginCommandHandlerBase.Require,
											LoginBuiltInUser.RequireLogin {
		
		String createCompanyId(String tenantCode, String companyCode);
	}
}