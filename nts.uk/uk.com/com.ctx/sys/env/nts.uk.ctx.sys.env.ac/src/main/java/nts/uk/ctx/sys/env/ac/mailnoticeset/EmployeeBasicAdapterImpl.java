/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.ac.mailnoticeset;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.pub.employee.EmployeeBasicExport;
import nts.uk.ctx.bs.employee.pub.employee.SyEmployeePub;
import nts.uk.ctx.sys.env.dom.mailnoticeset.adapter.EmployeeBasicAdapter;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeBasicImport;

/**
 * The Class EmployeeBasicAdapter.
 */
@Stateless
public class EmployeeBasicAdapterImpl implements EmployeeBasicAdapter {

	/** The sy employee pub. */
	@Inject
	private SyEmployeePub syEmployeePub;

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.env.dom.mailnoticeset.adapter.SysEmployeeAdapter#
	 * getEmpBasicBySId(java.lang.String)
	 */
	@Override
	public Optional<EmployeeBasicImport> getEmpBasicBySId(String employeeId) {
		EmployeeBasicExport employeeBasicExport = this.syEmployeePub.getEmpBasicBySId(employeeId);
		if (employeeBasicExport == null) {
			return Optional.empty();
		}

		EmployeeBasicImport employeeBasicImport = new EmployeeBasicImport(employeeBasicExport.getEmployeeId(),
				employeeBasicExport.getEmployeeCode(), employeeBasicExport.getBusinessName());
		return Optional.of(employeeBasicImport);
	}

}
