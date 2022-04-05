/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.loginold.adapter;

import java.util.Optional;

import nts.uk.ctx.sys.gateway.dom.login.password.EmployeeCodeSettingImport;

/**
 * The Interface EmployeeCodeSettingAdapter.
 */
public interface SysEmployeeCodeSettingAdapter {

	/**
	 * Gets the by company id.
	 *
	 * @param companyId the company id
	 * @return the by company id
	 */
	Optional<EmployeeCodeSettingImport> getbyCompanyId(String companyId);
}
