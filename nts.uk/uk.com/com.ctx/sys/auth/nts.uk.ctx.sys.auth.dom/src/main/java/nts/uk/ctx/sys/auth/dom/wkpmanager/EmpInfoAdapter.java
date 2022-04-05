/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.wkpmanager;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo.EmpInfoImport;
import nts.uk.ctx.sys.auth.dom.employee.dto.EmJobTitleHisImport;
import nts.uk.ctx.sys.auth.dom.wkpmanager.dom.EmpBasicInfoImport;
import nts.uk.ctx.sys.auth.dom.wkpmanager.dom.PersonInfoImport;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Interface PersonInfoAdapter.
 */
public interface EmpInfoAdapter {
	
	/**
	 * get list person by list person ID
	 * @param personId
	 * @return
	 */
	List<PersonInfoImport> getByListId(List<String> personId);
	
	/**
	 * Gets the list person info.
	 *
	 * @param listSid the list sid
	 * @return the list person info
	 */
	List<EmpBasicInfoImport> getListPersonInfo(List<String> listSid);
	
	// RequestList61
	List<EmpInfoImport> getEmpInfo(List<String> lstSid);

	//RequestList466
	//期間内に特定の職場（List）に所属している社員一覧を取得
	List<String> getListEmployeeId(List<String> wkpIds, DatePeriod dateperiod);
	//RequestList515
	//職位ID（List）と基準日から該当する社員一覧を取得する
	List<String> getListEmployee(List<String> jobTitleIds, GeneralDate baseDate);
	//社員所属職位履歴を取得   RequestList33
	Optional<EmJobTitleHisImport> getTitleHist (String employeeId, GeneralDate baseDate);
	
}