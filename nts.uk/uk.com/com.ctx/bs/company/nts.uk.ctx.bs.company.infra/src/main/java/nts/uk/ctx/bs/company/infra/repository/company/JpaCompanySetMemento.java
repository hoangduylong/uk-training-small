/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.company.infra.repository.company;

import nts.uk.ctx.bs.company.dom.company.CompanyCode;
import nts.uk.ctx.bs.company.dom.company.CompanyId;
import nts.uk.ctx.bs.company.dom.company.CompanySetMemento;
import nts.uk.ctx.bs.company.dom.company.Name;
import nts.uk.ctx.bs.company.dom.company.StartMonth;
import nts.uk.ctx.bs.company.infra.entity.company.BcmmtCompanyInfor;

/**
 * The Class JpaCompanySetMemento.
 */
public class JpaCompanySetMemento implements CompanySetMemento{
	
	/** The company. */
	private BcmmtCompanyInfor company;
	
	
	/**
	 * Instantiates a new jpa company set memento.
	 *
	 * @param company the company
	 */
	public JpaCompanySetMemento(BcmmtCompanyInfor company) {
		this.company = company;
	}

	/**
	 * Sets the company code.
	 *
	 * @param companyCode the new company code
	 */
	@Override
	public void setCompanyCode(CompanyCode companyCode) {
		this.company.companyCode = companyCode.v();
	}

	/**
	 * Sets the company id.
	 *
	 * @param companyId the new company id
	 */
	@Override
	public void setCompanyId(CompanyId companyId) {
		this.company.bcmmtCompanyInforPK.companyId = companyId.v();
	}

	/**
	 * Sets the start month.
	 *
	 * @param startMonth the new start month
	 */
	@Override
	public void setStartMonth(StartMonth startMonth) {
		this.company.startMonth = startMonth.v();
	}

	@Override
	public void setCompanyName(Name companyName) {
		this.company.companyName = companyName.v();
	}

}
