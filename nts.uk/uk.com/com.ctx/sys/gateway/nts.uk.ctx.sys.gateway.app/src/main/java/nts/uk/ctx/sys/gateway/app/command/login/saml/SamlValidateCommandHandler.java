package nts.uk.ctx.sys.gateway.app.command.login.saml;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.net.URLCodec;

import com.onelogin.saml2.util.Constants;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.Value;
import lombok.val;
import nts.arc.diagnose.stopwatch.embed.EmbedStopwatch;
import nts.arc.task.tran.AtomTask;
import nts.gul.security.saml.SamlResponseValidator;
import nts.gul.security.saml.SamlResponseValidator.ValidateException;
import nts.gul.security.saml.SamlSetting;
import nts.gul.security.saml.ValidSamlResponse;
import nts.uk.ctx.sys.gateway.app.command.login.LoginCommandHandlerBase;
import nts.uk.ctx.sys.gateway.app.command.login.LoginRequire;
import nts.uk.ctx.sys.gateway.dom.login.IdentifiedEmployeeInfo;
import nts.uk.ctx.sys.gateway.dom.singlesignon.saml.FindSamlSetting;
import nts.uk.ctx.sys.gateway.dom.singlesignon.saml.IdpUserAssociation;
import nts.uk.ctx.sys.gateway.dom.singlesignon.saml.IdpUserAssociationRepository;
import nts.uk.ctx.sys.shared.dom.employee.EmployeeDataManageInfoAdapter;
import nts.uk.ctx.sys.shared.dom.user.UserRepository;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class SamlValidateCommandHandler extends LoginCommandHandlerBase<
													SamlValidateCommand, 
													SamlValidateCommandHandler.AuthenResult, 
													ValidateInfo, 
													SamlValidateCommandHandler.Require>{
	
	@Inject
	private FindSamlSetting findSamlSetting;
	
	@Inject
	private IdpUserAssociationRepository idpUserAssociationRepository;
	
	@Inject
	private EmployeeDataManageInfoAdapter employeeDataManageInfoAdapter;

	@Inject
	private UserRepository userRepository;
	
	// テナント認証失敗時
	@Override
	protected ValidateInfo tenantAuthencationFailed() {
		return ValidateInfo.failedToAuthTenant();
	}
	
	// 認証処理本体
	@Override
	@SneakyThrows
	protected AuthenResult authenticate(Require require, SamlValidateCommand command) {
		HttpServletRequest request = command.getRequest();

		// URLエンコードされているのでデコード
		URLCodec codec = new URLCodec("UTF-8");
		String serializedRelayState = codec.decode(request.getParameter("RelayState"));
		
		// RelayStateをオブジェクトに変換
		UkRelayState relayState = UkRelayState.deserialize(serializedRelayState);
		
		// RelayStateのテナント情報からSAMLSettingを取得
		SamlSetting samlSetting;
		{
			val opt = findSamlSetting.find(relayState.getTenantCode());
			if(!opt.isPresent()) {
				return AuthenResult.failed(CauseOfFailure.NO_SAML_SETTING);
			}
			samlSetting = opt.get();
		}

		// SAMLResponseの検証処理
		samlSetting.setSignatureAlgorithm(Constants.RSA_SHA1);
		ValidSamlResponse validateResult;
		try {
			validateResult = SamlResponseValidator.validate(request, samlSetting);
		} catch (ValidateException e) {
			return AuthenResult.failed(CauseOfFailure.INVALID_SAML_RESPONSE);
		}

		// Idpユーザと社員の紐付けから社員を特定
		Optional<IdpUserAssociation> optAssociation = idpUserAssociationRepository.findByIdpUser(validateResult.getIdpUser());
		if (!optAssociation.isPresent()) {
			return AuthenResult.failed(CauseOfFailure.NO_ASSOCIATION);
		}
		
		// 識別
		IdentifiedEmployeeInfo identified;
		{
			val opt = identify(optAssociation.get().getEmployeeId());
			if (!opt.isPresent()) {
				return AuthenResult.failed(CauseOfFailure.EMPLOYEE_NOT_FOUND);
			}
			identified = opt.get();
		}
		
		return AuthenResult.success(identified, relayState.getRequestUrl());
	}
	
	/**
	 * 識別
	 * @param employeeId
	 * @return
	 */
	private Optional<IdentifiedEmployeeInfo> identify(String employeeId) {

		val employee = employeeDataManageInfoAdapter.findByEmployeeId(employeeId);
		if (!employee.isPresent() || employee.get().isDeleted()) {
			return Optional.empty();
		}
		
		val user = userRepository.getByAssociatedPersonId(employee.get().getPersonId());
		if (!user.isPresent()) {
			return Optional.empty();
		}
		
		return Optional.of(new IdentifiedEmployeeInfo(employee.get(), user.get()));
	}

	// 社員認証失敗時の処理
	@Override
	protected ValidateInfo authenticationFailed(Require require, AuthenResult state) {
		return ValidateInfo.failedToValidSaml(state.errorMessage);
	}
	
	// ログイン成功時の処理
	@Override
	protected ValidateInfo loginCompleted(Require require, AuthenResult state, Optional<String> msg) {
		return ValidateInfo.successToValidSaml(state.requestUrl, msg);
	}
	
	@Value
	static class AuthenResult implements LoginCommandHandlerBase.AuthenticationResultBase{
		
		private boolean isSuccess;
		private IdentifiedEmployeeInfo identified;
		private String requestUrl;
		private String errorMessage;
		private Optional<AtomTask> atomTask;
		
		public static AuthenResult success(IdentifiedEmployeeInfo identified, String requestUrl) {
			return new AuthenResult(true, identified, requestUrl, null, Optional.empty());
		}
		
		public static AuthenResult failed(CauseOfFailure cause) {
			return new AuthenResult(false, null, null, cause.getErrorMessageId(), Optional.empty());
		}
	}
	
	@RequiredArgsConstructor
	@Getter
	public enum CauseOfFailure {
		
		NO_SAML_SETTING("Msg_1980"),
		INVALID_SAML_RESPONSE("Msg_1988"),
		NO_ASSOCIATION("Msg_1989"),
		EMPLOYEE_NOT_FOUND("Msg_1990"),
		;
		
		private final String errorMessageId;
	}
	
	public static interface Require extends LoginCommandHandlerBase.Require {
	}
	
	@Override
	protected Require getRequire(SamlValidateCommand command) {
		return EmbedStopwatch.embed(new RequireImpl());
	}
	
	public class RequireImpl extends LoginRequire.BaseImpl implements Require {

	}
}