/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.workplace.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Instantiates a new kcp 010 workplace search data.
 */
@Builder
@Setter
@Getter
public class Kcp010WorkplaceSearchData{
	
	/** The workplace id. */
	private String workplaceId;
	
	/** The workplace code. */
	private String code;
	
	/** The workplace name. */
	private String name;
}
