/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.shared.dom.employee;

/**
 * The Enum EmployeeDeletionAttr.
 */
public enum SDelAtr {

	/** The notdeleted. */
	NOTDELETED(0),

	/** The deleted. */
	DELETED(1);

	/** The value. */
	public final int value;

	/** The Constant values. */
	private final static SDelAtr[] values = SDelAtr.values();

	/**
	 * Instantiates a new employee deletion attr.
	 *
	 * @param value
	 *            the value
	 */
	private SDelAtr(int value) {
		this.value = value;
	}

	/**
	 * Value of.
	 *
	 * @param value
	 *            the value
	 * @return the employee deletion attr
	 */
	public static SDelAtr valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (SDelAtr val : SDelAtr.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
