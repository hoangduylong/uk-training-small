package nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog;

/**
 * The Enum SuccessFailureClassification.
 */
public enum SuccessFailureClassification {
	
	/** The Failure. */
	//失敗
	Failure(0),

	/** The Success. */
	//成功
	Success(1);

	/** The value. */
	public int value;

	/** The Constant values. */
	private final static SuccessFailureClassification[] values = SuccessFailureClassification.values();
	
	/**
	 * Instantiates a new success failure classification.
	 *
	 * @param value the value
	 */
	private SuccessFailureClassification(int value) {
		this.value = value;
	}

	/**
	 * Value of.
	 *
	 * @param value the value
	 * @return the success failure classification
	 */
	public static SuccessFailureClassification valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (SuccessFailureClassification val : SuccessFailureClassification.values) {
			if (val.value == value) {
				return val;
			}
		}
		// Not found.
		return null;
	}
}
