/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.department;

import java.util.List;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;
import nts.uk.shr.com.history.strategic.ContinuousHistory;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class Department.
 */
@Getter
// 部門
public class Department extends AggregateRoot
		implements ContinuousHistory<DepartmentHistory, DatePeriod, GeneralDate> {

	/** The company id. */
	/* 会社ID */
	private CompanyId companyId;

	/** The id. */
	/* 会社コード */
	private String id;

	/** The dep history. */
	/* 部門履歴 */
	private List<DepartmentHistory> depHistory;

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((companyId == null) ? 0 : companyId.hashCode());
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
		Department other = (Department) obj;
		if (companyId == null) {
			if (other.companyId != null)
				return false;
		} else if (!companyId.equals(other.companyId))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.shr.com.history.History#items()
	 */
	@Override
	public List<DepartmentHistory> items() {
		return this.depHistory;
	}

}
