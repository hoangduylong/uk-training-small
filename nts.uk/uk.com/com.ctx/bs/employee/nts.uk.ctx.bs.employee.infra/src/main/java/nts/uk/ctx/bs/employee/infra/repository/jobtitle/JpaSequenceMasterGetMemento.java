/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.jobtitle;

import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceCode;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceMasterGetMemento;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceName;
import nts.uk.ctx.bs.employee.infra.entity.jobtitle.BsymtJobRank;

/**
 * The Class JpaSequenceMasterGetMemento.
 */
public class JpaSequenceMasterGetMemento implements SequenceMasterGetMemento {

	/** The type value. */
	private BsymtJobRank typeValue;

	/**
	 * Instantiates a new jpa sequence master get memento.
	 *
	 * @param typeValue the type value
	 */
	public JpaSequenceMasterGetMemento(BsymtJobRank typeValue) {
		this.typeValue = typeValue;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.basic.dom.company.organization.jobtitle.
	 * SequenceMasterGetMemento#getOrder()
	 */
	@Override
	public int getOrder() {
		return this.typeValue.getDisporder();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.basic.dom.company.organization.jobtitle.
	 * SequenceMasterGetMemento#getCompanyId()
	 */
	@Override
	public CompanyId getCompanyId() {
		return new CompanyId(this.typeValue.getBsymtJobSeqMasterPK().getCid());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.basic.dom.company.organization.jobtitle.
	 * SequenceMasterGetMemento#getSequenceCode()
	 */
	@Override
	public SequenceCode getSequenceCode() {
		return new SequenceCode(this.typeValue.getBsymtJobSeqMasterPK().getSeqCd());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.basic.dom.company.organization.jobtitle.
	 * SequenceMasterGetMemento#getSequenceName()
	 */
	@Override
	public SequenceName getSequenceName() {
		return new SequenceName(this.typeValue.getSeqName());
	}

}
