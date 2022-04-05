/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.company.infra.repository.company;

import nts.uk.ctx.bs.company.dom.company.CompanyCode;
import nts.uk.ctx.bs.company.dom.company.CompanyGetMemento;
import nts.uk.ctx.bs.company.dom.company.CompanyId;
import nts.uk.ctx.bs.company.dom.company.Name;
import nts.uk.ctx.bs.company.dom.company.StartMonth;
import nts.uk.ctx.bs.company.infra.entity.company.BcmmtCompanyInfor;

/**
 * The Class JpaCompanyGetMemento.
 */
public class JpaCompanyGetMemento implements CompanyGetMemento {
	
	/** The company. */
	private BcmmtCompanyInfor company;

	public JpaCompanyGetMemento(BcmmtCompanyInfor company) {
		this.company = company;
	}
	
	
	/**
	 * Gets the company code.
	 *
	 * @return the company code
	 */
	@Override
	public CompanyCode getCompanyCode() {
		return new CompanyCode(this.company.companyCode);
	}

	/**
	 * Gets the company id.
	 *
	 * @return the company id
	 */
	@Override
	public CompanyId getCompanyId() {
		return new CompanyId(this.company.bcmmtCompanyInforPK.companyId);
	}

	/**
	 * Gets the start month.
	 *
	 * @return the start month
	 */
	@Override
	public StartMonth getStartMonth() {
		return new StartMonth(this.company.startMonth);
	}


	@Override
	public Name getCompanyName() {
		return new Name(this.company.companyName);
	}

}
