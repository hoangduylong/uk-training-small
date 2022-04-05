package nts.uk.ctx.sys.gateway.app.command.tenantlogin;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import lombok.RequiredArgsConstructor;
import lombok.val;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.gul.web.HttpClientIpAddress;
import nts.uk.ctx.sys.gateway.app.find.login.dto.CheckContractDto;
import nts.uk.ctx.sys.gateway.dom.login.LoginClient;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.AuthenticateTenant;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthentication;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthenticationFailureLog;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthenticationFailureLogRepository;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthenticationRepository;
import nts.uk.shr.com.net.Ipv4Address;

/**
 * 
 * @author hiroki_katou
 *
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class TenantCheckCommandHandler extends CommandHandlerWithResult<TenantAuthenticateCommand, CheckContractDto> {

	@Inject
    private TenantAuthenticationRepository tenantAuthenticationRepo;
	
	@Inject
	private TenantAuthenticationFailureLogRepository tenantAuthenticationFailureLogRepo;

	@Override
	protected CheckContractDto handle(CommandHandlerContext<TenantAuthenticateCommand> context) {
		RequireImpl require = new RequireImpl();
		val command = context.getCommand();
		val request = command.getRequest();
		if(command.getTenantCode().isEmpty()) {
			// テナント認証情報がないので、再認証必要
			return new CheckContractDto(true);
		}
		
		// ログインクライアントの生成
		val loginClient = new LoginClient(
				Ipv4Address.parse(HttpClientIpAddress.get(request)), 
				request.getHeader("user-agent"));
		
		val tenantAuthResult = ConnectDataSourceOfTenant.connect(
				require, loginClient, command.getTenantCode(), command.getPassword());
		
		if(tenantAuthResult.isFailure()) {
			transaction.execute(() -> {
				tenantAuthResult.getAtomTask().run();
			});
			// テナント認証失敗なので、再認証必要
			return new CheckContractDto(true);
		}
		// テナント認証成功なので、再認証不要
		return new CheckContractDto(false);
	}
	
	@RequiredArgsConstructor
	private class RequireImpl implements AuthenticateTenant.Require{
		@Override
		public Optional<TenantAuthentication> getTenantAuthentication(String tenantCode) {
			return tenantAuthenticationRepo.find(tenantCode);
		}
		
		@Override
		public void insert(TenantAuthenticationFailureLog failureLog) {
			tenantAuthenticationFailureLogRepo.insert(failureLog);
		}
	}
}
