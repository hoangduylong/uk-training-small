/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.access.role;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.employee.service.EmployeeReferenceRangeImport;

/**
 * The Interface SyRoleWorkplaceAdapter.
 */
public interface SyRoleAdapter {
	
	/**
	 * Find list wkp id by role id.
	 *
	 * @param systemType the system type
	 * @param baseDate the base date
	 * @return the list
	 */
	WorkplaceIDImport findListWkpIdByRoleId(Integer systemType, GeneralDate baseDate);
	

	/**
	 *
	 * @param systemType the system type
	 * @return the list
	 */
	WorkplaceIDImport findListWkpId(Integer systemType);
	
	//社員参照範囲を取得する
	EmployeeReferenceRangeImport getRangeByRoleID(String roleID);

}
