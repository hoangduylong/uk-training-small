package nts.uk.ctx.sys.gateway.infra.entity.securitypolicy;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.layer.infra.data.jdbc.map.JpaEntityMapper;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.AccountLockPolicy;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "SGWMT_ACC_LOCK_POLICY")
public class SgwstAccountLockPolicy extends UkJpaEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "CONTRACT_CD")
	public String contractCd; 
	
	@Column(name = "ERROR_COUNT")
	public BigDecimal errorCount;
	
	@Column(name = "LOCK_INTERVAL")
	public BigDecimal lockInterval;
	
	@Column(name = "LOCK_OUT_MESSAGE")
	public String lockOutMessage;
	
	@Column(name = "IS_USE")
	public BigDecimal isUse;
	
	public static final JpaEntityMapper<SgwstAccountLockPolicy> MAPPER = new JpaEntityMapper<>(SgwstAccountLockPolicy.class);
	
	@Override
	protected Object getKey() {
		return this.contractCd;
	}
	
	public AccountLockPolicy toDomain() {
		return AccountLockPolicy.createFromJavaType(
				contractCd,
				errorCount.intValue(), 
				lockInterval.intValue(),
				lockOutMessage, 
				isUse.intValue() == 1 ? true : false);
	}
}
