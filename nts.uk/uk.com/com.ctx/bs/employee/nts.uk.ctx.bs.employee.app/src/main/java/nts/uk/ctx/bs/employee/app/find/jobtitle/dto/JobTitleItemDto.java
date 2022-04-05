/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.jobtitle.dto;

import lombok.Builder;
import lombok.Data;

/**
 * The Class JobTitleItemDto.
 */
@Data
@Builder
public class JobTitleItemDto {
	
	/** The id. */
	private String id;

	/** The code. */
	private String code;

	/** The name. */
	private String name;

}
