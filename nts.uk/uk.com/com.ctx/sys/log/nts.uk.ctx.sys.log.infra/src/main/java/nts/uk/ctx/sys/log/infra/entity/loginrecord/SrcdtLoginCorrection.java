/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.log.infra.entity.loginrecord;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;


/**
 * The persistent class for the SRCDT_LOGIN_CORRECTION database table.
 * 
 */
@Entity
@Table(name="SRCDT_LOGIN_CORRECTION")
@Getter
@Setter
public class SrcdtLoginCorrection extends ContractUkJpaEntity implements Serializable {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The srcdt login record PK. */
	@EmbeddedId
	private SrcdtLoginRecordPK srcdtLoginRecordPK;

	/** The lock status. */
	@Column(name="LOCK_STATUS")
	private Integer lockStatus;

	/** The login method. */
	@Column(name="LOGIN_METHOD")
	private Integer loginMethod;

	/** The login status. */
	@Column(name="LOGIN_STATUS")
	private Integer loginStatus;

	/** The remarks. */
	@Column(name="REMARKS")
	private String remarks;

	/** The url. */
	@Column(name="URL")
	private String url;

	/**
	 * Instantiates a new srcdt login record.
	 */
	public SrcdtLoginCorrection() {
	}

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.srcdtLoginRecordPK;
	}

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((srcdtLoginRecordPK == null) ? 0 : srcdtLoginRecordPK.hashCode());
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
		SrcdtLoginCorrection other = (SrcdtLoginCorrection) obj;
		if (srcdtLoginRecordPK == null) {
			if (other.srcdtLoginRecordPK != null)
				return false;
		} else if (!srcdtLoginRecordPK.equals(other.srcdtLoginRecordPK))
			return false;
		return true;
	}
	
	
}