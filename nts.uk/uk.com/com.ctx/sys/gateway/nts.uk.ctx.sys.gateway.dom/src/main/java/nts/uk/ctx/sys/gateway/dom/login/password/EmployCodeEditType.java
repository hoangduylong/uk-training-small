/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.login.password;

/**
 * The Enum EmployCodeEditType.
 */
public enum EmployCodeEditType {

	/** The Zero before. */
	ZeroBefore(0, "前ゼロ", "前ゼロ"),

	/** The Zero after. */
	ZeroAfter(1, "後ゼロ", "後ゼロ"),
	
	/** The Space before. */
	SpaceBefore(2, "前スペース", "前スペース"),

	/** The Space after. */
	SpaceAfter(3, "後スペース", "後スペース");

	/** The value. */
	public int value;

	/** The name id. */
	public String nameId;

	/** The description. */
	public String description;

	/** The Constant values. */
	private final static EmployCodeEditType[] values = EmployCodeEditType.values();

	/**
	 * Instantiates a new employ code edit type.
	 *
	 * @param value the value
	 * @param nameId the name id
	 * @param description the description
	 */
	private EmployCodeEditType(int value, String nameId, String description) {
		this.value = value;
		this.nameId = nameId;
		this.description = description;
	}

	/**
	 * Value of.
	 *
	 * @param value the value
	 * @return the employ code edit type
	 */
	public static EmployCodeEditType valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (EmployCodeEditType val : EmployCodeEditType.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
