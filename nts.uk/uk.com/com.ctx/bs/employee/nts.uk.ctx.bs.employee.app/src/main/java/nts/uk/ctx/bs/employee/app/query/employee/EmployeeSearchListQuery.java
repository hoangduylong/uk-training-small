/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.query.employee;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import nts.arc.time.GeneralDate;

/**
 * The Class EmployeeSearchListQuery.
 */
@Getter
@Setter
public class EmployeeSearchListQuery implements Serializable {

	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/** The base date. */
	private GeneralDate baseDate;
	
	/** The employee ids. */
	private List<String> employeeIds;

}
