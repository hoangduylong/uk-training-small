/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.employment;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class BsymtEmployment.
 */
@Getter
@Setter
@Entity
@Table(name = "BSYMT_EMPLOYMENT")
public class BsymtEmployment extends ContractUkJpaEntity implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The cempt employment PK. */
	@EmbeddedId
	protected BsymtEmploymentPK bsymtEmploymentPK;

	/** The name. */
	@Basic(optional = false)
	@Column(name = "NAME")
	private String name;
	
	@Basic(optional = true)
	@Column(name = "EMP_EXT_CD")
	private String empExternalCode;
	
	@Basic(optional = true)
	@Column(name = "MEMO")
	private String memo;
	
	@Basic(optional = true)
	@Column(name = "COMMON_MASTER_ID")
	private String empCommonMasterId;
	
	@Basic(optional = true)
	@Column(name = "COMMON_MASTER_ITEM_ID")
	private String empCommonMasterItemId;
	
	/**
	 * Instantiates a new cempt employment.
	 */
	public BsymtEmployment() {
		super();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.bsymtEmploymentPK;
	}

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((bsymtEmploymentPK == null) ? 0 : bsymtEmploymentPK.hashCode());
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
		BsymtEmployment other = (BsymtEmployment) obj;
		if (bsymtEmploymentPK == null) {
			if (other.bsymtEmploymentPK != null)
				return false;
		} else if (!bsymtEmploymentPK.equals(other.bsymtEmploymentPK))
			return false;
		return true;
	}


}
