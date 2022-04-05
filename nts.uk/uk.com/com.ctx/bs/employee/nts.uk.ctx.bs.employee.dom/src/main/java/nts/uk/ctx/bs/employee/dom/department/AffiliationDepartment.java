/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.department;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class AffiliationDepartment. - 所属部門
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AffiliationDepartment extends AggregateRoot {

	/** The id. */
	private String id;

	/** The period. */
	private DatePeriod period;

	/** The employee id. */
	private String employeeId;

	/** The department id. */
	private String departmentId;

	public static AffiliationDepartment createDmainFromJavaType(String id, GeneralDate startDate, GeneralDate endDate,
			String empId, String departmentId) {
		return new AffiliationDepartment(id, new DatePeriod(startDate, endDate), empId, departmentId);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AffiliationDepartment other = (AffiliationDepartment) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
