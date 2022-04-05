package nts.uk.ctx.sys.gateway.dom.tenantlogin;

public interface TenantAuthenticationFailureLogRepository {

	void insert(TenantAuthenticationFailureLog domain);
}
