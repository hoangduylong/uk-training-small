/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailserver;

/**
 * The Enum EmailAuthentication.
 */
// 端数処理(詳細計算式)
public enum AuthenticationMethod {

	POP_BEFORE_SMTP(0, "Enum_AuthenticationMethod_POP_BEFORE_SMTP"),

	IMAP_BEFORE_SMTP(1, "Enum_AuthenticationMethod_IMAP_BEFORE_SMTP"),

	SMTP_AUTH_LOGIN(2, "Enum_AuthenticationMethod_SMTP_AUTH_LOGIN"),
	
	SMTP_AUTH_PLAIN(3, "Enum_AuthenticationMethod_SMTP_AUTH_PLAIN"),

	SMTP_AUTH_CRAM_MD5(4, "Enum_AuthenticationMethod_SMTP_AUTH_CRAM_MD5");


	/** The value. */
	public final int value;

	/** The name id. */
	public final String nameId;

	/** The Constant values. */
	private final static AuthenticationMethod[] values = AuthenticationMethod.values();

	/**
	 * Instantiates a new rounding.
	 *
	 * @param value
	 *            the value
	 * @param nameId
	 *            the name id
	 */
	private AuthenticationMethod(int value, String nameId) {
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
	public static AuthenticationMethod valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (AuthenticationMethod val : AuthenticationMethod.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
