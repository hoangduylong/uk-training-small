package nts.uk.ctx.sys.gateway.infra.entity.tenantlogin;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.layer.infra.data.jdbc.map.JpaEntityMapper;
import nts.uk.ctx.sys.gateway.dom.login.LoginClient;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthenticationFailureLog;
import nts.uk.shr.com.net.Ipv4Address;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="SGWDT_FAIL_LOG_TENANT_AUTH")
public class SgwdtFailLogTenantAuth extends UkJpaEntity {

	@EmbeddedId
	public SgwdtFailLogTenantAuthPK pk;
	
	public static final JpaEntityMapper<SgwdtFailLogTenantAuth> MAPPER = new JpaEntityMapper<>(SgwdtFailLogTenantAuth.class);

	@Override
	protected Object getKey() {
		return this.pk;
	}
	
	public TenantAuthenticationFailureLog toDomain() {
		return new TenantAuthenticationFailureLog(
				pk.getFailureDateTime(), 
				new LoginClient(Ipv4Address.parse(pk.getIpv4Address()), pk.getUserAgent()),
				pk.getTriedTenantCode(), 
				pk.getTriedPassword());
	}
}
