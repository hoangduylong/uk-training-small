/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.employee.employeeindesignated;

import lombok.Getter;
import lombok.Setter;
import nts.arc.time.GeneralDate;

/**
 * The Class EmploymentStatusDto.
 */
@Getter
@Setter
public class EmploymentStatusDto {
	/** The employee id. */
	private String employeeId;
	
	/** The referene date. */
	private GeneralDate refereneDate;
	
	/** The status of employment. */
	private int statusOfEmployment;
	
	/** The leave holiday type. */
	private int leaveHolidayType;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((employeeId == null) ? 0 : employeeId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EmploymentStatusDto other = (EmploymentStatusDto) obj;
		if (employeeId == null) {
			if (other.employeeId != null)
				return false;
		} else if (!employeeId.equals(other.employeeId))
			return false;
		return true;
	}

}
