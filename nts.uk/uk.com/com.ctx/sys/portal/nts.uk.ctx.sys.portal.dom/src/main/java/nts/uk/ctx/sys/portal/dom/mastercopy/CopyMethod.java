/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.dom.mastercopy;
/**
 * The Enum CopyMethod.
 */
// 処理方法
public enum CopyMethod {

	/** The do nothing. */
	// コピーしない
	DO_NOTHING(0, "Enum_CopyMethod_DO_NOTHING", "コピーしない"),

	/** The replace all. */
	// 削除新規
	REPLACE_ALL(1, "Enum_CopyMethod_REPLACE_ALL", "削除新規"),

	/** The add new. */
	// 新規のみ
	ADD_NEW(2, "Enum_CopyMethod_ADD_NEW", "新規のみ");

	/** The value. */
	public final int value;

	/** The name id. */
	public final String nameId;

	/** The description. */
	public final String description;

	/** The Constant values. */
	private final static CopyMethod[] values = CopyMethod.values();

	/**
	 * Instantiates a new copy method.
	 *
	 * @param value
	 *            the value
	 * @param nameId
	 *            the name id
	 * @param description
	 *            the description
	 */
	private CopyMethod(int value, String nameId, String description) {
		this.value = value;
		this.nameId = nameId;
		this.description = description;
	}

	/**
	 * Value of.
	 *
	 * @param value
	 *            the value
	 * @return the copy method
	 */
	public static CopyMethod valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (CopyMethod val : CopyMethod.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}

}
