/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employee.order;

import java.util.List;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * The Class EmployeeOrder.
 */
// 社員の並び順
@Getter
public class EmployeeOrder extends AggregateRoot {

	/** The no. */
	private int no; // NO

	/** The order conditions. */
	private List<EmployeeOrderCondition> orderConditions; // 並び順条件

	/** The company id. */
	private String companyId; // 会社ID

	/** The name. */
	private EmployeeOrderName name; // 名称

	/** The type. */
	private EmployeeSearchCallSystemType type; // 種類

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((companyId == null) ? 0 : companyId.hashCode());
		result = prime * result + no;
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		return result;
	}

	/* (non-Javadoc)
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
		EmployeeOrder other = (EmployeeOrder) obj;
		if (companyId == null) {
			if (other.companyId != null)
				return false;
		} else if (!companyId.equals(other.companyId))
			return false;
		if (no != other.no)
			return false;
		if (type != other.type)
			return false;
		return true;
	}
	
}
