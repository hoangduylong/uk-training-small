package nts.uk.ctx.bs.company.dom.company;

import lombok.AllArgsConstructor;

/**
 * 期首月
 * @author yennth
 *
 */
@AllArgsConstructor
public enum MonthStr {
	ONE(1, "1月", "Enum_StartingMonthType_JANUARY"),
	TWO(2, "2月", "Enum_StartingMonthType_FEBRUARY"),
	THREE(3, "3月", "Enum_StartingMonthType_MARCH"),
	FOUR(4, "4月", "Enum_StartingMonthType_APRIL"),
	FIVE(5, "5月", "Enum_StartingMonthType_MAY"),
	SIX(6, "6月", "Enum_StartingMonthType_JUNE"),
	SEVEN(7, "7月", "Enum_StartingMonthType_JULY"),
	EIGHT(8, "8月", "Enum_StartingMonthType_AUGUST"),
	NINE(9, "9月", "Enum_StartingMonthType_SEPTEMBER"),
	TEN(10, "10月", "Enum_StartingMonthType_OCTOBER"),
	ELEVEN(11, "11月", "Enum_StartingMonthType_NOVEMBER"),
	TWELVE(12, "12月", "Enum_StartingMonthType_DECEMBER");
	public final int value;
	public String month;
	public String nameId;
}
