/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.classification;

import lombok.Setter;
import nts.uk.ctx.bs.employee.dom.classification.ClassificationCode;
import nts.uk.ctx.bs.employee.dom.classification.ClassificationGetMemento;
import nts.uk.ctx.bs.employee.dom.classification.ClassificationName;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.infra.entity.classification.BsymtClassification;
import nts.uk.shr.com.primitive.Memo;

/**
 * The Class JpaClassificationGetMemento.
 */
public class JpaClassificationGetMemento implements ClassificationGetMemento{
	
	/** The bsymt classification. */
	
	
	/**
	 * Sets the bsymt classification.
	 *
	 * @param bsymtClassification the new bsymt classification
	 */
	@Setter
	private BsymtClassification bsymtClassification;
	
	/**
	 * Instantiates a new jpa classification get memento.
	 *
	 * @param bsymtClassification the bsymt classification
	 */
	public JpaClassificationGetMemento(BsymtClassification bsymtClassification) {
		this.bsymtClassification = bsymtClassification;
	}

	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.classification.ClassificationGetMemento#getCompanyId()
	 */
	@Override
	public CompanyId getCompanyId() {
		return new CompanyId(this.bsymtClassification.getBsymtClassificationPK().getCid());
	}

	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.classification.ClassificationGetMemento#getClassificationCode()
	 */
	@Override
	public ClassificationCode getClassificationCode() {
		return new ClassificationCode(
				this.bsymtClassification.getBsymtClassificationPK().getClscd());
	}

	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.classification.ClassificationGetMemento#getClassificationName()
	 */
	@Override
	public ClassificationName getClassificationName() {
		return new ClassificationName(this.bsymtClassification.getClsname());
	}
	
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.classification.ClassificationGetMemento#getClassificationMemo()
	 */
	@Override
	public Memo getClassificationMemo() {
		return new Memo(this.bsymtClassification.getMemo());
	}
	
}
