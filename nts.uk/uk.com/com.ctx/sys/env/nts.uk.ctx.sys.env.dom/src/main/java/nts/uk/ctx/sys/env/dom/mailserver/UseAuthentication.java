/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailserver;

/**
 * メール送信認証
 */
public enum UseAuthentication {

	/** The not use. */
	NOT_USE(0, "Enum_UseClassificationAtr_NOT_USE"),

	/** The use. */
	USE(1, "Enum_UseClassificationAtr_USE");

	/** The value. */
	public final int value;

	/** The name id. */
	public final String nameId;

	/** The Constant values. */
	private final static UseAuthentication[] values = UseAuthentication.values();

	/**
	 * Instantiates a new rounding.
	 *
	 * @param value
	 *            the value
	 * @param nameId
	 *            the name id
	 */
	private UseAuthentication(int value, String nameId) {
		this.value = value;
		this.nameId = nameId;
	}

	/**
	 * Value of.
	 *
	 * @param value
	 *            the value
	 * @return the rounding
	 */
	public static UseAuthentication valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (UseAuthentication val : UseAuthentication.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
