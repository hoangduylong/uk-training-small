package nts.uk.ctx.sys.gateway.dom.tenantlogin;

import java.util.Optional;

import lombok.val;
import nts.arc.task.tran.AtomTask;
import nts.arc.time.GeneralDate;
import nts.gul.util.value.LazyValue;
import nts.uk.ctx.sys.gateway.dom.login.LoginClient;

/**
 * テナント認証する
 * ※テナントロケータによるデータソースアクセス済みであること
 * @author hiroki_katou
 *
 */
public class AuthenticateTenant {
	public static TenantAuthenticationResult authenticate(Require require, String tenantCode, String password, LoginClient loginClient) {
		//失敗記録の生成
		LazyValue<AtomTask> failureLog = new LazyValue<>(
				() -> createFailreLog(require, tenantCode, password, loginClient));
		
		// テナントロケータに接続できている以上取得できるはず
		val optTenant = require.getTenantAuthentication(tenantCode);
		if(!optTenant.isPresent()) {
			return TenantAuthenticationResult.failedToIdentifyTenant(failureLog.get());
		}
		val tenant = optTenant.get();
		// パスワード検証
		if(!tenant.verifyPassword(password)) {
			// テナントのパスワード検証に失敗
			return TenantAuthenticationResult.failedDueToIncorrectPassword(failureLog.get());
		} 
		
		// 有効期限チェック
		if(!tenant.isAvailableAt(GeneralDate.today())) {
			// テナントの有効期限切れ
			return TenantAuthenticationResult.failedDueToExpiration(failureLog.get());
		}
		
		// 認証成功
		return TenantAuthenticationResult.success();
	}
	
	/**
	 * 失敗時の失敗記録生成
	 * @param require
	 * @param tenantCode
	 * @param password
	 * @param triedLoginClient
	 * @return
	 */
	private static AtomTask createFailreLog(Require require, String tenantCode, String password, LoginClient triedLoginClient) {
		val failureLog = TenantAuthenticationFailureLog.failedNow(triedLoginClient, tenantCode, password);
		return AtomTask.of(() -> {
			require.insert(failureLog);
		});
	}
	
	public static interface Require {
		Optional<TenantAuthentication> getTenantAuthentication(String tenantCode);
		void insert(TenantAuthenticationFailureLog failureLog);
	}
}
