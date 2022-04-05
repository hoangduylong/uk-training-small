/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.employee.order;

/**
 * The Enum OrderType.
 */
// 並び替え種類
public enum OrderType {

	/** The employment. */
	EMPLOYMENT(0, "Enum_OrderType_EMPLOYMENT", "雇用"),

	/** The department. */
	DEPARTMENT(1, "Enum_OrderType_DEPARTMENT", "部門"),

	/** The workplace. */
	WORKPLACE(2, "Enum_OrderType_WORKPLACE", "職場"),

	/** The classification. */
	CLASSIFICATION(3, "Enum_OrderType_CLASSIFICATION", "分類"),

	/** The position. */
	POSITION(4, "Enum_OrderType_POSITION", "職位"),

	/** The hire date. */
	HIRE_DATE(5, "Enum_OrderType_HIRE_DATE", "入社日"),

	/** The name. */
	NAME(6, "Enum_OrderType_NAME", "氏名");

	/** The value. */
	public final int value;

	/** The name id. */
	public final String nameId;

	/** The description. */
	public final String description;

	/** The Constant values. */
	private final static OrderType[] values = OrderType.values();

	/**
	 * Instantiates a new order type.
	 *
	 * @param value the value
	 * @param nameId the name id
	 * @param description the description
	 */
	private OrderType(int value, String nameId, String description) {
		this.value = value;
		this.nameId = nameId;
		this.description = description;
	}

	/**
	 * Value of.
	 *
	 * @param value the value
	 * @return the order type
	 */
	public static OrderType valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (OrderType val : OrderType.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
