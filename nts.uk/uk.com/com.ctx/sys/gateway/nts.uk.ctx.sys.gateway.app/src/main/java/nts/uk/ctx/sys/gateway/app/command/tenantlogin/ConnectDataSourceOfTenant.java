package nts.uk.ctx.sys.gateway.app.command.tenantlogin;

import lombok.val;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.sys.gateway.dom.login.LoginClient;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.AuthenticateTenant;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.AuthenticateTenant.Require;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthenticationFailureLog;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthenticationResult;
import nts.uk.shr.com.system.property.UKServerSystemProperties;
import nts.uk.shr.infra.data.TenantLocatorService;

/**
 * テナントのデータソースに接続する
 * @author hiroki_katou
 *
 */
public class ConnectDataSourceOfTenant {
	public static TenantAuthenticationResult connect(Require require, LoginClient loginClient, String tenantCode, String password) {
		
		/* テナントロケーター処理 */
		if (UKServerSystemProperties.usesTenantLocator()) {
			// テナント認証するため、一旦接続する
			
			TenantLocatorService.connect(tenantCode);
			// テナントの特定に失敗
			if(!TenantLocatorService.isConnected()) {
				// 失敗記録
				val failureLog = TenantAuthenticationFailureLog.failedNow(loginClient, tenantCode, password);
				val atomTask = AtomTask.of(() -> {
					require.insert(failureLog);
				});
				return TenantAuthenticationResult.failedToIdentifyTenant(atomTask);
			}
		}
		
		// テナント認証
		val result = AuthenticateTenant.authenticate(require, tenantCode, password, loginClient);
		if(result.isFailure()) {
			if (UKServerSystemProperties.usesTenantLocator()) {
				// テナント認証に失敗した場合、データソースとの接続を切断する
				TenantLocatorService.disconnect();
			}
		}
		return result;
	}
}
