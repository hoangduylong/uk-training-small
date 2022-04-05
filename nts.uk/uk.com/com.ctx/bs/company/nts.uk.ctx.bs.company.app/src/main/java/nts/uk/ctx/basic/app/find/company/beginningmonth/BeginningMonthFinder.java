/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.basic.app.find.company.beginningmonth;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.company.dom.company.Company;
import nts.uk.ctx.bs.company.dom.company.CompanyId;
import nts.uk.ctx.bs.company.dom.company.CompanyRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class BeginningMonthFinder.
 */
@Stateless
public class BeginningMonthFinder {

	/** The repo. */
	@Inject
	private CompanyRepository repo;

	/**
	 * Find.
	 *
	 * @return the beginning month dto
	 */
	public BeginningMonthDto find() {
		// Get beginning month.
		String companyId = AppContexts.user().companyId();
		BeginningMonthDto result = new BeginningMonthDto();
		Optional<Company> comOpt = repo.getComanyInfoByCid(companyId);
		if (comOpt.isPresent()) {
			Company company = comOpt.get();
			result.setCompanyId(new CompanyId(company.getCompanyId()));
			result.setStartMonth(company.getStartMonth().value);
		}
		return result;
	}

}
