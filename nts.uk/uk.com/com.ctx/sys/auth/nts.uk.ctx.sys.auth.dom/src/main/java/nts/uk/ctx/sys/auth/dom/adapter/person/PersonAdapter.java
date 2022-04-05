/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.adapter.person;

import java.util.List;
import java.util.Optional;

/**
 * The Interface PersonAdapter.
 */
public interface PersonAdapter {

	/**
	 * Find by person ids.
	 *
	 * @param personIds
	 *            the person ids
	 * @return the list
	 */
	List<PersonImport> findByPersonIds(List<String> personIds);

	/**
	 * 
	 * @param listSID
	 * @return 個人社員基本情報 RequestList.No1
	 */
	List<EmployeeBasicInforAuthImport> listPersonInfor(List<String> listSID);

	Optional<EmployeeBasicInforAuthImport> getPersonInfor(String employeeID);
}
