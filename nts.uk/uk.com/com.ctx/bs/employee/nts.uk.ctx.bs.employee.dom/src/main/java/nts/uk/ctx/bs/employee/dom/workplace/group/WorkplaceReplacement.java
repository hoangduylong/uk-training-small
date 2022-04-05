package nts.uk.ctx.bs.employee.dom.workplace.group;

public enum WorkplaceReplacement {
	
	/** 追加 */
	ADD(0,"追加"),

	/** 削除 */
	DELETE(1,"削除"),

	/** 所属済み */
	ALREADY_BELONGED(2,"所属済み"),

	/** 別職場グループに所属 */
	BELONGED_ANOTHER(3,"別職場グループに所属");

	/** The value. */
	public int value;
	
	/** The value. */
	public String nameId;

	/** The Constant values. */
	private final static WorkplaceReplacement[] values = WorkplaceReplacement.values();

	/**
	 * Instantiates a new closure id.
	 *
	 * @param value
	 *            the value
	 * @param description
	 *            the description
	 */
	private WorkplaceReplacement(int value,String nameId) {
		this.value = value;
		this.nameId = nameId;
	}

	/**
	 * Value of.
	 *
	 * @param value
	 *            the value
	 * @return the use division
	 */
	public static WorkplaceReplacement valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (WorkplaceReplacement val : WorkplaceReplacement.values) {
			if (val.value == value) {
				return val;
			}
		}
		// Not found.
		return null;
	}
	
	// [1] 指定職場グループに所属するか	
	public boolean checkWplReplace() {
		if (this == WorkplaceReplacement.ADD || this == WorkplaceReplacement.ALREADY_BELONGED)
			return true;
		return false;
	}
}
