/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked;

/**
 * The Enum LogType.
 */
public enum LockType {
	
	/** The auto lock. */
	AUTO_LOCK(0, "Enum_Auto_Lock", "自動ロック"),

	/** The enforcement lock. */
	ENFORCEMENT_LOCK(1, "Enum_Enforcement_Lock", "強制ロック");

	/** The value. */
	public int value;

	/** The name id. */
	public String nameId;

	/** The description. */
	public String description;

	/** The Constant values. */
	private final static LockType[] values = LockType.values();

	/**
	 * Instantiates a new manage distinct.
	 *
	 * @param value            the value
	 * @param nameId the name id
	 * @param description            the description
	 */
	private LockType(int value, String nameId, String description) {
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
	public static LockType valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (LockType val : LockType.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
