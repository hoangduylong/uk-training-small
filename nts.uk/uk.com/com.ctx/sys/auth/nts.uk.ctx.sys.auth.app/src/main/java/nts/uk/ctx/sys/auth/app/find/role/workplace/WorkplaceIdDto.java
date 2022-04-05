/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.app.find.role.workplace;

import java.util.List;

import lombok.Getter;
import lombok.Setter;


/**
 * The Class WorkplaceIdDto.
 */
@Setter
@Getter
public class WorkplaceIdDto {
	
	/** The list workplace ids. */
	private List<String> listWorkplaceIds;
	
	/** The is all emp. */
	private Boolean isAllEmp;
}
