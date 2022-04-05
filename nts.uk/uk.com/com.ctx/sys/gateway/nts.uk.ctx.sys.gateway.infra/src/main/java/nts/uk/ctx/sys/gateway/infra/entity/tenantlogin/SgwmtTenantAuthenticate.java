package nts.uk.ctx.sys.gateway.infra.entity.tenantlogin;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.layer.infra.data.jdbc.map.JpaEntityMapper;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.sys.gateway.dom.tenantlogin.TenantAuthentication;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="SGWMT_TENANT_AUTHENTICATION")
public class SgwmtTenantAuthenticate extends UkJpaEntity {
	
	@Id
	@Column(name="CONTRACT_CD")
	private String tenantCode;
	
	@Column(name="TENANT_PASSWORD")
	private String tenantPassword;
	
	@Column(name="START_DATE")
	private GeneralDate startDate;
	
	@Column(name="END_DATE")
	private GeneralDate endDate;

	public static final JpaEntityMapper<SgwmtTenantAuthenticate> MAPPER = new JpaEntityMapper<>(SgwmtTenantAuthenticate.class);
	
	public TenantAuthentication toDomain() {
		return new TenantAuthentication(
				tenantCode, 
				tenantPassword, 
				new DatePeriod(startDate, endDate));
	}

	@Override
	protected Object getKey() {
		return tenantCode;
	}
}