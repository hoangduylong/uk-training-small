/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.classification;

import lombok.Setter;
import nts.uk.ctx.bs.employee.dom.classification.ClassificationCode;
import nts.uk.ctx.bs.employee.dom.classification.ClassificationName;
import nts.uk.ctx.bs.employee.dom.classification.ClassificationSetMemento;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.ctx.bs.employee.infra.entity.classification.BsymtClassification;
import nts.uk.ctx.bs.employee.infra.entity.classification.BsymtClassificationPK;
import nts.uk.shr.com.primitive.Memo;

/**
 * The Class JpaClassificationSetMemento.
 */
public class JpaClassificationSetMemento implements ClassificationSetMemento{
	
	/** The bsymt classification. */
	
	/**
	 * Sets the bsymt classification.
	 *
	 * @param bsymtClassification the new bsymt classification
	 */
	
	/**
	 * Sets the bsymt classification.
	 *
	 * @param bsymtClassification the new bsymt classification
	 */
	@Setter
	private BsymtClassification bsymtClassification;
	
	/**
	 * Instantiates a new jpa classification set memento.
	 *
	 * @param bsymtClassification the bsymt classification
	 */
	public JpaClassificationSetMemento(BsymtClassification bsymtClassification) {
		if(bsymtClassification.getBsymtClassificationPK() == null){
			bsymtClassification.setBsymtClassificationPK(new BsymtClassificationPK());
		}
		this.bsymtClassification = bsymtClassification;
	}

	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.classification.ClassificationSetMemento#setCompanyId(nts.uk.ctx.bs.employee.dom.common.CompanyId)
	 */
	@Override
	public void setCompanyId(CompanyId companyId) {
		this.bsymtClassification.getBsymtClassificationPK().setCid(companyId.v());
	}

	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.classification.ClassificationSetMemento#setManagementCategoryCode(nts.uk.ctx.bs.employee.dom.classification.ClassificationCode)
	 */
	@Override
	public void setManagementCategoryCode(ClassificationCode managementCategoryCode) {
		this.bsymtClassification.getBsymtClassificationPK().setClscd(managementCategoryCode.v());
	}

	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.classification.ClassificationSetMemento#setManagementCategoryName(nts.uk.ctx.bs.employee.dom.classification.ClassificationName)
	 */
	@Override
	public void setManagementCategoryName(ClassificationName managementCategoryName) {
		this.bsymtClassification.setClsname(managementCategoryName.v());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.classification.ClassificationSetMemento#setManagementCategoryMemo(nts.uk.ctx.bs.employee.dom.classification.ClassificationMemo)
	 */
	@Override
	public void setManagementCategoryMemo(Memo managementCategoryMemo) {
		this.bsymtClassification.setMemo(managementCategoryMemo.v());
		
	}

}
