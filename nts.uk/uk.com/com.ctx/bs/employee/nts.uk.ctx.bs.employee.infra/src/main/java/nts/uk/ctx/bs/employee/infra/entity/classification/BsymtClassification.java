/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.classification;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class BsymtClassification.
 */
@Getter
@Setter
@Entity
@Table(name = "BSYMT_CLASSIFICATION")
public class BsymtClassification extends ContractUkJpaEntity implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The bsymt classification PK. */
	@EmbeddedId
	protected BsymtClassificationPK bsymtClassificationPK;

	/** The exclus ver. */
	@Basic(optional = false)
	@NotNull
	@Column(name = "EXCLUS_VER")
	private int exclusVer;

	/** The clsname. */
	@Basic(optional = false)
	@NotNull
	@Column(name = "CLSNAME")
	private String clsname;

	/** The memo. */
	@Column(name = "MEMO")
	private String memo;

	/**
	 * Instantiates a new bsymt classification.
	 */
	public BsymtClassification() {
	}

	/**
	 * Instantiates a new bsymt classification.
	 *
	 * @param bsymtClassificationPK
	 *            the bsymt classification PK
	 */
	public BsymtClassification(BsymtClassificationPK bsymtClassificationPK) {
		this.bsymtClassificationPK = bsymtClassificationPK;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#hashCode()
	 */
	@Override
	public int hashCode() {
		int hash = 0;
		hash += (bsymtClassificationPK != null ? bsymtClassificationPK.hashCode() : 0);
		return hash;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object object) {
		if (!(object instanceof BsymtClassification)) {
			return false;
		}
		BsymtClassification other = (BsymtClassification) object;
		if ((this.bsymtClassificationPK == null && other.bsymtClassificationPK != null)
				|| (this.bsymtClassificationPK != null
						&& !this.bsymtClassificationPK.equals(other.bsymtClassificationPK))) {
			return false;
		}
		return true;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.bsymtClassificationPK;
	}

}
