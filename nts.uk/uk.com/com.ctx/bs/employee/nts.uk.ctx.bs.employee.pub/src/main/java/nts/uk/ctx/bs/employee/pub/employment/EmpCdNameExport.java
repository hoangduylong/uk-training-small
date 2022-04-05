/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.employment;

import lombok.Builder;
import lombok.Data;

/**
 * The Class EmpCdNameExport.
 */
@Data
@Builder
public class EmpCdNameExport {

	/** The code. */
	private String code;

	/** The name. */
	private String name;

}
