/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.workplace;

import lombok.Builder;
import lombok.Data;

/**
 * The Class WkpConfigAtTimeExport.
 */
@Data
@Builder
public class WkpConfigAtTimeExport {

	/** The workplace id. */
	private String workplaceId;

	/** The hierarchy cd. */
	private String hierarchyCd;
}
