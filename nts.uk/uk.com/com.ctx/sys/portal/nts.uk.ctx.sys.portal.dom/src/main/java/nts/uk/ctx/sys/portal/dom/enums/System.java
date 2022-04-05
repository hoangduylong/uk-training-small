package nts.uk.ctx.sys.portal.dom.enums;

/**
 * 
 * @author sonnh1
 *
 */
public enum System {	
	
	/**
	 * 0:共通
	 */
	COMMON(0),
	/**
	 * 1:勤次郎
	 */
	TIME_SHEET(1),
	/**
	 * 2:オフィスヘルパー
	 */
	OFFICE_HELPER(2),
	/**
	 * 3:Ｑ太郎
	 */
	KYUYOU(3),
	/**
	 * 4:人事郎
	 */
	JINJIROU(4);

	public final int value;

	System(int type) {
		this.value = type;
	}
	
	public static System valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (System val : System.values()) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
