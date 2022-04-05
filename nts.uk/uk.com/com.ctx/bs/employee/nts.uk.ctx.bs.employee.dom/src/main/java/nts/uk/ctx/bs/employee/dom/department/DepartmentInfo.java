/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.department;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.bs.employee.dom.common.CompanyId;

/**
 * The Class DepartmentInfo.
 */
@Getter
@AllArgsConstructor
// 部門情報
public class DepartmentInfo extends AggregateRoot {

	/** The company id. */
	// 会社ID
	private CompanyId companyId;

	/** The dep history id. */
	// 履歴ID
	private String depHistoryId;

	/** The department id. */
	// 部門ID
	private String departmentId;

	/** The department code. */
	// 部門コード
	private DepartmentCode departmentCode;

	/** The department name. */
	// 部門名称
	private DepartmentName departmentName;

	// 部門表示名
	private DepartmentDisplayName depDisplayName;

	/** The dep generic name. */
	// 部門総称
	private DepartmentGenericName depGenericName;

	/** The outside dep code. */
	// 部門外部コード
	private Optional<DepartmentExternalCode> outsideDepCode;

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
		result = prime * result + ((depHistoryId == null) ? 0 : depHistoryId.hashCode());
		result = prime * result + ((departmentId == null) ? 0 : departmentId.hashCode());
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
		DepartmentInfo other = (DepartmentInfo) obj;
		if (companyId == null) {
			if (other.companyId != null)
				return false;
		} else if (!companyId.equals(other.companyId))
			return false;
		if (depHistoryId == null) {
			if (other.depHistoryId != null)
				return false;
		} else if (!depHistoryId.equals(other.depHistoryId))
			return false;
		if (departmentId == null) {
			if (other.departmentId != null)
				return false;
		} else if (!departmentId.equals(other.departmentId))
			return false;
		return true;
	}

}
