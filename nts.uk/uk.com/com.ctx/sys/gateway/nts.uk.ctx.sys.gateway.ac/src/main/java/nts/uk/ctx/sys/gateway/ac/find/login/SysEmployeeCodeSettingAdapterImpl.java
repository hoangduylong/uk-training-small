/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.ac.find.login;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.setting.code.EmployeeCodeEditSettingExport;
import nts.uk.ctx.bs.employee.pub.employee.employeeInfo.setting.code.IEmployeeCESettingPub;
import nts.uk.ctx.sys.gateway.dom.login.password.EmployeeCodeSettingImport;
import nts.uk.ctx.sys.gateway.dom.loginold.adapter.SysEmployeeCodeSettingAdapter;

/**
 * The Class EmployeeCodeSettingAdapterImpl.
 */
@Stateless
public class SysEmployeeCodeSettingAdapterImpl implements SysEmployeeCodeSettingAdapter {

	@Inject
	private IEmployeeCESettingPub iEmployeeCESettingPub;

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.gateway.dom.adapter.EmployeeCodeSettingAdapter#
	 * getbyCompanyId(java.lang.String)
	 */
	@Override
	public Optional<EmployeeCodeSettingImport> getbyCompanyId(String companyId) {
		Optional<EmployeeCodeEditSettingExport> opEmployeeCodeSetting = iEmployeeCESettingPub.getByComId(companyId);
		if (opEmployeeCodeSetting.isPresent()) {
			EmployeeCodeEditSettingExport employeeCodeSetting = opEmployeeCodeSetting.get();
			// convert dto
			EmployeeCodeSettingImport emCodeSetting = new EmployeeCodeSettingImport(employeeCodeSetting.getCompanyId(),
					employeeCodeSetting.getDigitNumb(), employeeCodeSetting.getCeMethodAtr());
			return Optional.of(emCodeSetting);
		}
		return Optional.empty();
	}
}
