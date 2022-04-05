package nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.lockoutdata;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.infra.data.jdbc.map.JpaEntityMapper;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockType;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockoutData;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LoginMethod;
import nts.uk.ctx.sys.shared.dom.user.ContractCode;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

/**
 * The Class SgwdtLockout.
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="SGWDT_LOCKOUT")
public class SgwdtLockout extends UkJpaEntity implements Serializable {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The id. */
	@EmbeddedId
	private SgwdtLockoutPK sgwdtLockoutDataPK;

	/** The lock type. */
	@Column(name="LOCK_TYPE")
	private Integer lockType;
	
	@Column(name="LOGIN_METHOD")
	private Integer loginMethod;
	
	public static final JpaEntityMapper<SgwdtLockout> MAPPER = new JpaEntityMapper<>(SgwdtLockout.class);
	
	@Override
	protected Object getKey() {
		return this.sgwdtLockoutDataPK;
	}
	
	public LockoutData toDomain() {
		return new LockoutData(
				new ContractCode(this.sgwdtLockoutDataPK.getContractCd()), 
				this.sgwdtLockoutDataPK.getUserId(), 
				this.sgwdtLockoutDataPK.getLockoutDateTime(), 
				LockType.valueOf(this.lockType), 
				LoginMethod.valueOf(this.loginMethod));
	}

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((sgwdtLockoutDataPK == null) ? 0 : sgwdtLockoutDataPK.hashCode());
		return result;
	}

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!super.equals(obj))
			return false;
		if (getClass() != obj.getClass())
			return false;
		SgwdtLockout other = (SgwdtLockout) obj;
		if (sgwdtLockoutDataPK == null) {
			if (other.sgwdtLockoutDataPK != null)
				return false;
		} else if (!sgwdtLockoutDataPK.equals(other.sgwdtLockoutDataPK))
			return false;
		return true;
	}
	
}