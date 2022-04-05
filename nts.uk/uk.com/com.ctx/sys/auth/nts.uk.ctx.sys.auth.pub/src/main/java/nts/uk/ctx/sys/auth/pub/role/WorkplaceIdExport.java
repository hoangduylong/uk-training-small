/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pub.role;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

/**
 * The Class WorkplaceIdExport.
 */
@Setter
@Getter
public class WorkplaceIdExport {

	/** The list workplace ids. */
	private List<String> listWorkplaceIds;
	
	/** The is all emp. */
	private Boolean isAllEmp;
}
