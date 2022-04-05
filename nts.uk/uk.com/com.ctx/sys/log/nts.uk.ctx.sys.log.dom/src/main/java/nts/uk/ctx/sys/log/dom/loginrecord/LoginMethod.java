/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.log.dom.loginrecord;

/**
 * The Enum LoginMethod.
 */
//ログイン方法
public enum LoginMethod {
	
	/**  通常. */
	Normal(0, "Enum_Normal", "通常"), 
	
	/**  シングルサインオン. */
	loginOnce(1, "Enum_LoginOnce", "シングルサインオン"),
	
	/**  WebAPI. */
	WebAPI(2, "Enum_WepApi", "WepApi"); 

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
