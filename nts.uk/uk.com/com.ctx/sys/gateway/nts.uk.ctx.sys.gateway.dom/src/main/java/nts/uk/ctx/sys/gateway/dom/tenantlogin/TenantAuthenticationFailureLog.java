package nts.uk.ctx.sys.gateway.dom.tenantlogin;

import lombok.Getter;
import nts.arc.layer.dom.objecttype.DomainAggregate;
import nts.arc.time.GeneralDateTime;
import nts.gul.text.StringUtil;
import nts.uk.ctx.sys.gateway.dom.login.LoginClient;

/**
 * テナント認証失敗記録
 */
@Getter
public class TenantAuthenticationFailureLog implements DomainAggregate {
	
	/** 失敗日時 */
	private final GeneralDateTime failureDateTime;
	/** ログインクライアント */
	private final LoginClient loginClient;
	/** 試行したテナントコード */
	private final String triedTenantCode;
	/** 試行したパスワード */
	private final String triedPassword;
	
	public TenantAuthenticationFailureLog(GeneralDateTime dateTime, LoginClient loginClient, String triedTenantCode, String triedPassword) {
		this.failureDateTime = dateTime;
		this.loginClient = loginClient;
		// ユーザー入力の値は適当な長さでカットして保持する
		this.triedTenantCode = StringUtil.cutOffAsLengthHalf(triedTenantCode, 100);
		this.triedPassword = StringUtil.cutOffAsLengthHalf(triedPassword, 100);
	}
	
	/**
	 * いま失敗した
	 * @param loginClient
	 * @param triedTenantCode
	 * @param triedPassword
	 * @return
	 */
	public static TenantAuthenticationFailureLog failedNow(LoginClient loginClient, String triedTenantCode, String triedPassword) {
		return new TenantAuthenticationFailureLog(
				GeneralDateTime.now(), 
				loginClient, 
				triedTenantCode, 
				triedPassword);
	}
}
