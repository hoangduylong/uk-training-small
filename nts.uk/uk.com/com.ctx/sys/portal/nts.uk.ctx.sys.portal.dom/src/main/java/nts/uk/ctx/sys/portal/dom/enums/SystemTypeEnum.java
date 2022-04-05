package nts.uk.ctx.sys.portal.dom.enums;

/**
 * システム種類
 * 
 * @author admin
 *
 */

public enum SystemTypeEnum {
	// field 人事システム
	PERSON_SYSTEM(0, "Enum_SystemType_PERSON_SYSTEM"),
	// field 勤怠システム
	ATTENDANCE_SYSTEM(1, "Enum_SystemType_ATTENDANCE_SYSTEM"),
	// field 給与システム
	PAYROLL_SYSTEM(2, "Enum_SystemType_PAYROLL_SYSTEM"),
	// field オフィスヘルパー
	OFFICE_HELPER(3, "Enum_SystemType_OFFICE_HELPER");

	/** The code. */
	public final int code;

	/** The name id. */
	public final String system;

	private SystemTypeEnum(int code, String system) {
		this.code = code;
		this.system = system;
	}
	/**
	 * Value of.
	 *
	 * @param value the value
	 * @return the role type
	 */
	public static SystemTypeEnum valueOf(int value) {
		// Find value.
		for (SystemTypeEnum val : SystemTypeEnum.values()) {
			if (val.code == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
