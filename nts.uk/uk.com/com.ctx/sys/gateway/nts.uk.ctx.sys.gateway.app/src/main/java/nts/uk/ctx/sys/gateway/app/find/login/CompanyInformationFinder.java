/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.app.find.login;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.shared.dom.company.CompanyInformationAdapter;
import nts.uk.ctx.sys.shared.dom.company.CompanyInformationImport;

/**
 * The Class CompanyFinder.
 */
@Stateless
public class CompanyInformationFinder {

	/** The company information adapter. */
	@Inject
	private CompanyInformationAdapter companyInformationAdapter;

	/**
	 * 会社選択表示
	 * CCG007_D：ログイン_形式３
	 * @param 契約CD
	 * @return the list
	 */
	public List<CompanyInformationImport> findAll(String contractCode) {
		return companyInformationAdapter.findLstCompany(contractCode);
	}
	
	/**
	 * Gets the company infor by code.
	 *
	 * @param companyId the company id
	 * @return the company infor by code
	 */
	public CompanyInformationImport getCompanyInforByCode(String companyId) {
		return companyInformationAdapter.findById(companyId);
	}
}
