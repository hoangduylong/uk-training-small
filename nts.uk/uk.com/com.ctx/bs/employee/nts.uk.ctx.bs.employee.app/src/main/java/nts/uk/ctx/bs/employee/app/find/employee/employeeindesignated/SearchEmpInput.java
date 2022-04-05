/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.employee.employeeindesignated;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import nts.arc.time.GeneralDate;

/**
 * The Class SearchEmpInput.
 */
@Getter
@Setter
public class SearchEmpInput {
	
	/** The workplace id list. */
	private List<String> workplaceIdList;
	
	/** The reference date. */
	private GeneralDate referenceDate;
	
	/** The emp status. */
	private List<Integer> empStatus;

}
