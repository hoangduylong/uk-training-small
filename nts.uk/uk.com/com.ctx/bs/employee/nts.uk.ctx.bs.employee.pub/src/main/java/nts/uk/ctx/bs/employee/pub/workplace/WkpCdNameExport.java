/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.workplace;

import lombok.Builder;
import lombok.Data;

/**
 * The Class PubWorkplaceDto.
 */
@Data
@Builder
public class WkpCdNameExport {

	/** The workplace code. */
	private String wkpCode;

	/** The workplace name. */
	private String wkpName;

}
