/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.jobtitle.info;

/**
 * The Enum IsManagerStatus.
 */
public enum IsManagerStatus {

	/** The false. */
	FALSE(0, false),

	/** The true. */
	TRUE(1, true);

	/** The value. */
	public int value;

	/** The boolean value. */
	public boolean booleanValue;

	/** The Constant values. */
	private final static IsManagerStatus[] values = IsManagerStatus.values();

	/**
	 * Instantiates a new checks if is manager status.
	 *
	 * @param value
	 *            the value
	 */
	private IsManagerStatus(int value, boolean booleanValue) {
		this.value = value;
		this.booleanValue = booleanValue;
	}

	/**
	 * Value of.
	 *
	 * @param value
	 *            the value
	 * @return the checks if is manager status
	 */
	public static IsManagerStatus valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (IsManagerStatus val : IsManagerStatus.values) {
			if (val.value == value) {
				return val;
			}
		}
		// Not found.
		return null;
	}
	
	public static IsManagerStatus valueOf(Boolean value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (IsManagerStatus val : IsManagerStatus.values) {
			if (val.booleanValue == value) {
				return val;
			}
		}
		// Not found.
		return null;
	}
}
