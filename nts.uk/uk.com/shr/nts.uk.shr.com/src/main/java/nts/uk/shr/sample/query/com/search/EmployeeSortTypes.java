package nts.uk.shr.sample.query.com.search;

/**
 * The Enum EmployeeSortTypes.
 */
//個人情報の並び替え種類
public enum EmployeeSortTypes {
	
	/** The sort employment. */
	// 雇用
	SORT_EMPLOYMENT(1, "Enum_Sort_Employment", "雇用"),

	/** The sort department. */
	// 部門
	SORT_DEPARTMENT(2, "Enum_Sort_Department", "部門"),

	/** The sort workplace. */
	// 職場
	SORT_WORKPLACE(3, "Enum_Sort_Workplace", "職場"),
	
	/** The sort classification. */
	// 分類
	SORT_CLASSIFICATION(4, "Enum_Sort_Classification", "分類"),

	/** The sort position. */
	// 職位
	SORT_POSITION(5, "Enum_Sort_Position", "職位"),
	
	/** The sort hiredate. */
	// 入社日
	SORT_HIREDATE(6, "Enum_Sort_HireDate", "入社日"),
	
	/** The sort name. */
	// 氏名
	SORT_NAME(7, "Enum_Sort_Name", "氏名");

	/** The value. */
	public final int value;

	/** The name id. */
	public final String nameId;

	/** The description. */
	public final String description;

	/** The Constant values. */
	private final static EmployeeSortTypes[] values = EmployeeSortTypes.values();
	
	/**
	 * Instantiates a new employee sort types.
	 *
	 * @param value the value
	 * @param nameId the name id
	 * @param description the description
	 */
	private EmployeeSortTypes(int value, String nameId, String description) {
		this.value = value;
		this.nameId = nameId;
		this.description = description;
	}
	
	/**
	 * Value of.
	 *
	 * @param value the value
	 * @return the employee sort types
	 */
	public static EmployeeSortTypes valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (EmployeeSortTypes val : EmployeeSortTypes.values) {
			if (val.value == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
