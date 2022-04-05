/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employee.order;

import lombok.Getter;
import nts.arc.layer.dom.DomainObject;

/**
 * The Class EmployeeOrderCondition.
 */
// 並び替え条件の順番
@Getter
public class EmployeeOrderCondition extends DomainObject {

	/** The order. */
	private int order; // 順番

	/** The type. */
	private OrderType type; // 種類

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + order;
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
		EmployeeOrderCondition other = (EmployeeOrderCondition) obj;
		if (order != other.order)
			return false;
		if (type != other.type)
			return false;
		return true;
	}

	
}
