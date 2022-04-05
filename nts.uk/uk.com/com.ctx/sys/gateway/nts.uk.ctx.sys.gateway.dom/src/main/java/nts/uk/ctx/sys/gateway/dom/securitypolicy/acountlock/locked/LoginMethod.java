/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked;

/**
 * The Enum LoginMethod.
 */
public enum LoginMethod {
	
	/** The normal login. */
	NORMAL_LOGIN(0, "Enum_Normal_Login", "通常ログイン"),

	/** The single sign on. */
	SINGLE_SIGN_ON(1, "Enum_Single_Sign-on", "シングルサインオン");

	/** The value. */
	public int value;

	/** The name id. */
	public String nameId;

	/** The description. */
	public String description;

	/** The Constant values. */
	private final static LoginMethod[] values = LoginMethod.values();

	/**
	 * Instantiates a new manage distinct.
	 *
	 * @param value            the value
	 * @param nameId the name id
	 * @param description            the description
	 */
	private LoginMethod(int value, String nameId, String description) {
		this.value = value;
		this.nameId = nameId;
		this.description = description;
	}

	/**
	 * Value of.
	 *
	 * @param value
	 *            the value
	 * @return the manage distinct
	 */
	public static LoginMethod valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (LoginMethod val : LoginMethod.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
