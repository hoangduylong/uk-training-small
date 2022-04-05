/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.affiliate;

import lombok.Getter;
import nts.arc.layer.dom.DomainObject;

/**
 * The Class WorkHierarchy.
 */
@Getter
public class WorkPlaceHierarchy extends DomainObject {

	/** The workplace id. */
	// 職場ID
	private WorkplaceId workplaceId;

	/** The hierarchy code. */
	// 階層コード
	private String hierarchyCode;

}
