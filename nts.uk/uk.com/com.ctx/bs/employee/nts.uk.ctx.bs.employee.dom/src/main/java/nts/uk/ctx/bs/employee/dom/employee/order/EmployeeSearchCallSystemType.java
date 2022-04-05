/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employee.order;

/**
 * The Enum EmployeeSearchCallSystemType.
 */
// 社員検索の呼び出し元システム種類
public enum EmployeeSearchCallSystemType {

	/** The employment. */
	EMPLOYMENT(0, "Enum_EmployeeSearchCallSystemType_EMPLOYMENT", "就業"),

	/** The human resource. */
	HUMAN_RESOURCE(1, "Enum_EmployeeSearchCallSystemType_HUMAN_RESOURCE", "人事"),

	/** The salary. */
	SALARY(2, "Enum_EmployeeSearchCallSystemType_SALARY", "給与"),

	/** The personal info. */
	PERSONAL_INFO(3, "Enum_EmployeeSearchCallSystemType_PERSONAL_INFO", "個人情報");

	/** The value. */
	public final int value;

	/** The name id. */
	public final String nameId;

	/** The description. */
	public final String description;

	/** The Constant values. */
	private final static EmployeeSearchCallSystemType[] values = EmployeeSearchCallSystemType.values();

	/**
	 * Instantiates a new employee search call system type.
	 *
	 * @param value the value
	 * @param nameId the name id
	 * @param description the description
	 */
	private EmployeeSearchCallSystemType(int value, String nameId, String description) {
		this.value = value;
		this.nameId = nameId;
		this.description = description;
	}

	/**
	 * Value of.
	 *
	 * @param value the value
	 * @return the employee search call system type
	 */
	public static EmployeeSearchCallSystemType valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (EmployeeSearchCallSystemType val : EmployeeSearchCallSystemType.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
