/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.role;

/**
 * The Enum RoleAtr.
 */
public enum RoleAtr {
	
	/** The incharge. */
	// 担当
	INCHARGE(0, "Enum_RoleAtr_inCharge", "担当"),

	/** The general. */
	// 一般
	GENERAL(1, "Enum_RoleAtr_General", "一般");

	/** The value. */
	public final int value;

	/** The name id. */
	public final String nameId;

	/** The description. */
	public final String description;

	/** The Constant values. */
	private final static RoleAtr[] values = RoleAtr.values();

	/**
	 * Instantiates a new role atr.
	 *
	 * @param value the value
	 * @param nameId the name id
	 * @param description the description
	 */
		private RoleAtr(int value, String nameId, String description) {
			this.value = value;
			this.nameId = nameId;
			this.description = description;
		}

	/**
	 * Value of.
	 *
	 * @param value the value
	 * @return the role atr
	 */
	public static RoleAtr valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (RoleAtr val : RoleAtr.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
    /**
     * Checks if is general.
     *
     * @return true, if is general
     */
    public boolean isGeneral() {
        return GENERAL.equals(this);
    }
    
    /**
     * Checks if is inCharge.
     *
     * @return true, if is general
     */
    public boolean isInCharge() {
        return INCHARGE.equals(this);
    }
}
