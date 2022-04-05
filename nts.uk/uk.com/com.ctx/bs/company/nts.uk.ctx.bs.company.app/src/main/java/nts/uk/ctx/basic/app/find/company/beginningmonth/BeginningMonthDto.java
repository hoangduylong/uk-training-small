/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.basic.app.find.company.beginningmonth;

import lombok.Data;
import nts.uk.ctx.basic.dom.company.beginningmonth.BeginningMonthSetMemento;
import nts.uk.ctx.bs.company.dom.company.CompanyId;
import nts.uk.ctx.bs.company.dom.company.StartMonth;

/**
 * The Class BeginningMonthDto.
 */
@Data
public class BeginningMonthDto implements BeginningMonthSetMemento {

	/** The company id. */
	private String companyId;

	/** The start month. */
	private Integer startMonth;
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.basic.dom.company.beginningmonth.BeginningMonthSetMemento#setCompanyId(nts.uk.ctx.bs.company.dom.company.CompanyId)
	 */
	@Override
	public void setCompanyId(CompanyId companyId) {
		this.companyId = companyId.v();
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.basic.dom.company.beginningmonth.BeginningMonthSetMemento#setMonth(nts.uk.ctx.bs.company.dom.company.StartMonth)
	 */
	@Override
	public void setMonth(StartMonth startMonth) {
		this.startMonth = startMonth.v();
	}
}
