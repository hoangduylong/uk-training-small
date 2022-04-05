package nts.uk.ctx.sys.log.dom.reference;

/*
 * author : thuongtv
 */
public enum DataTypeEnum {
	
	SCHEDULE(0, "Enum_DataType_Schedule"),
	DAILY_RESULTS(1, "Enum_DataType_DailyResults"),
	MONTHLY_RESULTS(2, "Enum_DataType_MonthlyResults"),
	ANY_PERIOD_SUMMARY(3, "Enum_DataType_AnyPeriodSummary"),
	APPLICATION_APPROVAL(4, "Enum_DataType_ApplicationApproval"),
	NOTIFICATION(5, "Enum_DataType_Notification"),
	SALARY_DETAIL(6, "Enum_DataType_SalaryDetail"),
	BONUS_DETAIL(7, "Enum_DataType_BonusDetail"),
	YEAR_END_ADJUSTMENT(8, "Enum_DataType_YearEndAdjustment"),
	MONTHLY_CALCULATION(9, "Enum_DataType_MonthlyCalculation"),
	RISING_SALARY_BACK(10, "Enum_DataType_RisingSalaryBack");
	
	/** The code. */
	public final int code;

	/** The name id. */
	public final String name;

	private DataTypeEnum(int code, String name) {
		this.code = code;
		this.name = name;
	}
	
	/** The Constant values. */
	private final static DataTypeEnum[] values = DataTypeEnum.values();
	/**
	 * Value of.
	 *
	 * @param value the value
	 * @return the role type
	 */
	public static DataTypeEnum valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (DataTypeEnum val : DataTypeEnum.values) {
			if (val.code == value) {
				return val;
			}
		}

		// Not found.
		return null;
	}
}
