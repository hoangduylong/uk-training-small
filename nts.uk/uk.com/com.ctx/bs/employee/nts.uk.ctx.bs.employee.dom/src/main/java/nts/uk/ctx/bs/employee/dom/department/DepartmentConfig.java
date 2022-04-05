/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.department;

import java.util.List;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.strategic.PersistentResidentHistory;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class DepartmentConfig.
 */
// 部門構成
@Getter
public class DepartmentConfig extends AggregateRoot
		implements PersistentResidentHistory<DepartmentConfigHistory, DatePeriod, GeneralDate> {

	/** The company id. */
	// 会社ID
	private String companyId;

	/** The dep config history. */
	// 履歴
	private List<DepartmentConfigHistory> depConfigHistories;

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
		if (!(obj instanceof DepartmentConfig))
			return false;
		DepartmentConfig other = (DepartmentConfig) obj;
		if (companyId == null) {
			if (other.companyId != null)
				return false;
		} else if (!companyId.equals(other.companyId))
			return false;
		return true;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.shr.com.history.History#items()
	 */
	@Override
	public List<DepartmentConfigHistory> items() {
		return this.depConfigHistories;
	}

}
