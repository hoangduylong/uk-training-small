/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.workplace.dto;

import lombok.Getter;
import lombok.Setter;
import nts.arc.time.GeneralDate;

/**
 * The Class WkpInfoFindObject.
 */
@Getter
@Setter
public class WkpInfoFindObject {

	/** The workplace id. */
	private String workplaceId;
	
	/** The history id. */
	private String historyId;
	
	/** The base date. */
	private GeneralDate baseDate;
}
