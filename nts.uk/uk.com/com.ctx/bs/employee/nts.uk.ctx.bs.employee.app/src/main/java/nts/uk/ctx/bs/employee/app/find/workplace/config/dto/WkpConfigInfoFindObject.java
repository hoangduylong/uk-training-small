/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.workplace.config.dto;

import lombok.Getter;
import lombok.Setter;
import nts.arc.time.GeneralDate;

/**
 * The Class WkpConfigInfoFindObject.
 */
@Getter
@Setter
public class WkpConfigInfoFindObject {

	/** The base date. */
	private GeneralDate baseDate;
	
	/** The system type. */
	private Integer systemType = 5;

	/** The restriction of reference range. */
	private Boolean restrictionOfReferenceRange;
}
