/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.loginold;

/**
 * The Enum LoginStatus.
 */
//ログイン状態
public enum LoginStatus {
	
	/** * 成功. */
	Success(0, "Success", "成功"),
	
	/** * 失敗. */
	Fail(1, "Fail", "失敗"),
	
	/** * 失敗（ロック）. */
	Fail_Lock(2, "Fail_Lock", "失敗（ロック）"),
	
	/** * ログアウト. */
	Logout(3, "Logout", "ログアウト"),
	
	/** * タイムアウト. */
	TimeOut(4, "TimeOut", "タイムアウト");
	
	/** The value. */
	public int value;

	/** The name id. */
	public String nameId;

	/** The description. */
	public String description;

	/** The Constant values. */
	private final static LoginStatus[] values = LoginStatus.values();

	/**
	 * Instantiates a new manage distinct.
	 *
	 * @param value            the value
	 * @param nameId the name id
	 * @param description            the description
	 */
	private LoginStatus(int value, String nameId, String description) {
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
	public static LoginStatus valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (LoginStatus val : LoginStatus.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}

}
