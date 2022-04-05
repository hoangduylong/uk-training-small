/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.ac.find.status.employment;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.pub.employment.statusemployee.StatusOfEmploymentExport;
import nts.uk.ctx.bs.employee.pub.employment.statusemployee.StatusOfEmploymentPub;
import nts.uk.ctx.sys.gateway.dom.adapter.status.employment.StatusEmploymentAdapter;
import nts.uk.ctx.sys.gateway.dom.adapter.status.employment.StatusOfEmploymentImport;

/**
 * The Class StatusOfEmploymentAdapterImpl.
 */
@Stateless
public class StatusOfEmploymentAdapterImpl implements StatusEmploymentAdapter{

	/** The status of employment pub. */
	@Inject
	private StatusOfEmploymentPub statusOfEmploymentPub;

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.adapter.status.employment.StatusEmploymentAdapter#getStatusOfEmployment(java.lang.String, nts.arc.time.GeneralDate)
	 */
	@Override
	public StatusOfEmploymentImport getStatusOfEmployment(String employeeId, GeneralDate referenceDate) {
		//get EmployeeInfo
		StatusOfEmploymentExport f = this.statusOfEmploymentPub.getStatusOfEmployment(employeeId, referenceDate);
		//check status present
		if(f != null){
			return new StatusOfEmploymentImport(f.getEmployeeId(), f.getRefereneDate(), f.getStatusOfEmployment(), f.getTempAbsenceFrNo());
		}
		
		return null;
	}
}
