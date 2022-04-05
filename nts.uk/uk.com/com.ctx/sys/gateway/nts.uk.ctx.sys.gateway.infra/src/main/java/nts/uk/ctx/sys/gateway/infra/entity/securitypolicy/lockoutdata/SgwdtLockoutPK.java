package nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.lockoutdata;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.infra.data.entity.type.GeneralDateTimeToDBConverter;
import nts.arc.time.GeneralDateTime;

/**
 * The primary key class for the SGWDT_LOCKOUT database table.
 * 
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class SgwdtLockoutPK implements Serializable {
	
	/** The Constant serialVersionUID. */
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	/** The user id. */
	@Column(name="USER_ID")
	private String userId;

	/** The contract cd. */
	@Column(name="CONTRACT_CD")
	private String contractCd;
	
	/** The lockout date time. */
	@Column(name="LOCKOUT_DATE_TIME")
	@Convert(converter = GeneralDateTimeToDBConverter.class)
	private GeneralDateTime lockoutDateTime;

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof SgwdtLockoutPK)) {
			return false;
		}
		SgwdtLockoutPK castOther = (SgwdtLockoutPK)other;
		return 
			this.userId.equals(castOther.userId)
			&& this.contractCd.equals(castOther.contractCd);
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.userId.hashCode();
		hash = hash * prime + this.contractCd.hashCode();
		
		return hash;
	}
}