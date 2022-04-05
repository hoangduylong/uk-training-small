/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.department;

import lombok.Getter;
import nts.arc.layer.dom.DomainObject;

/**
 * The Class WorkHierarchy.
 */
@Getter
// 職場階層
public class DepartmentHierarchy extends DomainObject {

	/** The workplace id. */
	// 部門ID
	private String departmentId;

	/** The hierarchy code. */
	// 階層コード
	private HierarchyCode hierarchyCode;
}
