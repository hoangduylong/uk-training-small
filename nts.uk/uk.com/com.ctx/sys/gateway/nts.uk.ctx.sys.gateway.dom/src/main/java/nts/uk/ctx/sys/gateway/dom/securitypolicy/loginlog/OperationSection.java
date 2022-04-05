package nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog;

/**
 * The Enum OperationSection.
 */
//操作区分
public enum OperationSection {

	/** The Login. */
	//ログイン
	Login(0),

	/** The Logout. */
	//ログアウト
	Logout(1),
	
	/** The Start up. */
	//起動
	StartUp(2),
	
	/** The Lock out. */
	//ロックアウト
	LockOut(3),
	
	/** The Release lock out. */
	//ロックアウト解除
	Release_LockOut(4);

	/** The value. */
	public int value;

	/** The Constant values. */
	private final static OperationSection[] values = OperationSection.values();
	
	/**
	 * Instantiates a new operation section.
	 *
	 * @param value the value
	 */
	private OperationSection(int value) {
		this.value = value;
	}

	/**
	 * Value of.
	 *
	 * @param value the value
	 * @return the operation section
	 */
	public static OperationSection valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (OperationSection val : OperationSection.values) {
			if (val.value == value) {
				return val;
			}
		}
		// Not found.
		return null;
	}
}
