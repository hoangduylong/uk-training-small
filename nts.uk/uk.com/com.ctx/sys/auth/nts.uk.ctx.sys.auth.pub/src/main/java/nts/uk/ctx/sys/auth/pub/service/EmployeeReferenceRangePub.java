/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pub.service;

/**
 * The Enum EmployeeReferenceRange.
 */
//社員参照範囲
public enum EmployeeReferenceRangePub {
	
	/** The all employee. */
	// 全社員
	ALL_EMPLOYEE(0, "Enum_EmployeeReferenceRange_allEmployee", "全社員"),

	/** The department and child. */
	// 部門（配下含む）
	DEPARTMENT_AND_CHILD(1, "Enum_EmployeeReferenceRange_departmentAndChild", "部門（配下含む）"),

	/** The department only. */
	// 部門（配下含まない）
	DEPARTMENT_ONLY(2, "Enum_EmployeeReferenceRange_departmentOnly", "部門（配下含まない）"),

	/** The only myself. */
	// 自分のみ
	ONLY_MYSELF(3, "Enum_EmployeeReferenceRange_onlyMyself", "自分のみ");

	/** The value. */
	public final int value;

	/** The name id. */
	public final String nameId;

	/** The description. */
	public final String description;

	/** The Constant values. */
	private final static EmployeeReferenceRangePub[] values = EmployeeReferenceRangePub.values();

	/**
	 * Instantiates a new employee reference range.
	 *
	 * @param value the value
	 * @param nameId the name id
	 * @param description the description
	 */
	private EmployeeReferenceRangePub(int value, String nameId, String description) {
		this.value = value;
		this.nameId = nameId;
		this.description = description;
	}

	/**
	 * Value of.
	 *
	 * @param value the value
	 * @return the employee reference range
	 */
	public static EmployeeReferenceRangePub valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (EmployeeReferenceRangePub val : EmployeeReferenceRangePub.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
