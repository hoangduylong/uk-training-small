/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.department;

import java.util.List;

import nts.arc.time.GeneralDate;

/**
 * The Interface DepartmentRepository.
 */
public interface DepartmentRepository {

	/**
	 * Find by.
	 *
	 * @param baseDate the base date
	 * @return the list
	 */
	List<DepartmentInfo> findBy(GeneralDate baseDate);

}
