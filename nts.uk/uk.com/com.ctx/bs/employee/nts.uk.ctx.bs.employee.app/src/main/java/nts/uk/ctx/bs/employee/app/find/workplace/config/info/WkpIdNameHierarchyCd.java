/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.workplace.config.info;

import lombok.Builder;
import lombok.Data;

/**
 * The Class WkpIdNameHierarchyCdExport.
 */
@Data
@Builder
public class WkpIdNameHierarchyCd {

	/** The workplace code. */
	private String wkpId;

	/** The workplace name. */
	private String wkpName;

	/** The hierarchy cd. */
	private String hierarchyCd;

}
