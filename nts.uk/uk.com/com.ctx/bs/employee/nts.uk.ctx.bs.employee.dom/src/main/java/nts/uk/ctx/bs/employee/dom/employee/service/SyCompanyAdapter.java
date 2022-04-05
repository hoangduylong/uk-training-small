package nts.uk.ctx.bs.employee.dom.employee.service;

import java.util.List;

import nts.uk.ctx.bs.employee.dom.employee.service.dto.AffCompanyHistExport;
import nts.arc.time.calendar.period.DatePeriod;

public interface SyCompanyAdapter {
	
	/**@author laitv
	 * RequestList No.211
	 * @param sid
	 * @param datePeriod
	 * @return
	 */
	List<AffCompanyHistExport> getAffCompanyHistByEmployee(List<String> sid, DatePeriod datePeriod);
	

}
