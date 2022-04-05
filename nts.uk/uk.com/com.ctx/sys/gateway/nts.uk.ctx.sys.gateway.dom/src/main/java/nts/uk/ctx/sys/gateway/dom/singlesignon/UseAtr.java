package nts.uk.ctx.sys.gateway.dom.singlesignon;

/**
 * The Enum UseType.
 */
public enum UseAtr {

	/** The Not use. */
	NotUse(0),

	/** The Use. */
	Use(1);

	/** The value. */
	public int value;

	/** The Constant values. */
	private final static UseAtr[] values = UseAtr.values();

	/**
	 * Instantiates a new use type.
	 *
	 * @param value
	 *            the value
	 */
	private UseAtr(int value) {
		this.value = value;
	}

	/**
	 * Value of.
	 *
	 * @param value
	 *            the value
	 * @return the use type
	 */
	public static UseAtr valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (UseAtr val : UseAtr.values) {
			if (val.value == value) {
				return val;
			}
		}
		// Not found.
		return null;
	}
}