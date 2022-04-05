package nts.uk.ctx.sys.gateway.infra.repository.tenantlogin;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthenticationFailureLog;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthenticationFailureLogRepository;
import nts.uk.ctx.sys.gateway.infra.entity.tenantlogin.SgwdtFailLogTenantAuth;
import nts.uk.ctx.sys.gateway.infra.entity.tenantlogin.SgwdtFailLogTenantAuthPK;

@Stateless
public class JpaTenantAuthenticationFailureLogRepository extends JpaRepository implements TenantAuthenticationFailureLogRepository{
	
	private SgwdtFailLogTenantAuth toEntity(TenantAuthenticationFailureLog domain) {
		return new SgwdtFailLogTenantAuth(
				new SgwdtFailLogTenantAuthPK(
					domain.getFailureDateTime(),
					domain.getLoginClient().getIpAddress().toString(), 
					domain.getLoginClient().getUserAgent(),
					domain.getTriedTenantCode(), 
					domain.getTriedPassword()));
	}
	
	@Override
	public void insert(TenantAuthenticationFailureLog domain) {
		this.commandProxy().insert(toEntity(domain));
	}
}
