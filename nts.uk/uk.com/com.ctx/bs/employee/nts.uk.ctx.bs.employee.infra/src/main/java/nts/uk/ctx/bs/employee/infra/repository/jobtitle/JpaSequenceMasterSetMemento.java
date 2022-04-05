/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.jobtitle;

import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceCode;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceMasterSetMemento;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceName;
import nts.uk.ctx.bs.employee.infra.entity.jobtitle.BsymtJobRank;
import nts.uk.ctx.bs.employee.infra.entity.jobtitle.BsymtJobSeqMasterPK;

/**
 * The Class JpaSequenceMasterSetMemento.
 */
public class JpaSequenceMasterSetMemento implements SequenceMasterSetMemento {

	/** The type value. */
	private BsymtJobRank typeValue;

	/**
	 * Instantiates a new jpa sequence master set memento.
	 *
	 * @param typeValue
	 *            the type value
	 */
	public JpaSequenceMasterSetMemento(BsymtJobRank typeValue) {
		this.typeValue = typeValue;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.basic.dom.company.organization.jobtitle.
	 * SequenceMasterSetMemento#setOrder(int)
	 */
	@Override
	public void setOrder(int order) {
		this.typeValue.setDisporder(order);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.basic.dom.company.organization.jobtitle.
	 * SequenceMasterSetMemento#setCompanyId(nts.uk.ctx.basic.dom.company.
	 * organization.jobtitle.CompanyId)
	 */
	@Override
	public void setCompanyId(CompanyId companyId) {
		BsymtJobSeqMasterPK pk = this.typeValue.getBsymtJobSeqMasterPK();
		if (pk == null) {
			pk = new BsymtJobSeqMasterPK();
		}
		pk.setCid(companyId.v());
		this.typeValue.setBsymtJobSeqMasterPK(pk);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.basic.dom.company.organization.jobtitle.
	 * SequenceMasterSetMemento#setSequenceCode(nts.uk.ctx.basic.dom.company.
	 * organization.jobtitle.SequenceCode)
	 */
	@Override
	public void setSequenceCode(SequenceCode sequenceCode) {
		BsymtJobSeqMasterPK pk = this.typeValue.getBsymtJobSeqMasterPK();
		if (pk == null) {
			pk = new BsymtJobSeqMasterPK();
		}
		pk.setSeqCd(sequenceCode.v());
		this.typeValue.setBsymtJobSeqMasterPK(pk);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.basic.dom.company.organization.jobtitle.
	 * SequenceMasterSetMemento#setSequenceName(nts.uk.ctx.basic.dom.company.
	 * organization.jobtitle.SequenceName)
	 */
	@Override
	public void setSequenceName(SequenceName sequenceName) {
		this.typeValue.setSeqName(sequenceName.v());
	}

}
