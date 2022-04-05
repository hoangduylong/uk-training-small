/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.shr.com.enumcommon;

/**
 * The Enum Abolition.
 */
public enum Abolition {

	/** The abolish. */
	// 廃止する
	ABOLISH(1, "Enum_Abolition_Abolish"),

	/** The not abolish. */
	// 廃止しない
	NOT_ABOLISH(0, "Enum_Abolition_Not_Abolish");

	/** The value. */
	public final int value;

	/** The name id. */
	public final String nameId;

	/** The Constant values. */
	private final static Abolition[] values = Abolition.values();

	/**
	 * Instantiates a new abolition.
	 *
	 * @param value
	 *            the value
	 * @param nameId
	 *            the name id
	 */
	private Abolition(int value, String nameId) {
		this.value = value;
		this.nameId = nameId;
	}

	/**
	 * Value of.
	 *
	 * @param value
	 *            the value
	 * @return the abolition
	 */
	public static Abolition valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (Abolition val : Abolition.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
