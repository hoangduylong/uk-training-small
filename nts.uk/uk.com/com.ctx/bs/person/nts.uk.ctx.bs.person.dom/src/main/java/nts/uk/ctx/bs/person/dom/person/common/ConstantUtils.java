package nts.uk.ctx.bs.person.dom.person.common;

import nts.arc.time.GeneralDate;

public class ConstantUtils {
	public static final int ENUM_UNDEFINE_VALUE = 99;
	public static final String MAX_DATE = "9999/12/31";
	public static final String MIN_DATE = "1900/01/01";
	public static final String FORMAT_DATE_YYYYMMDD = "yyyy/MM/dd";

	public static GeneralDate maxDate() {
		return GeneralDate.fromString(MAX_DATE, FORMAT_DATE_YYYYMMDD);
	}

	public static GeneralDate minDate() {
		return GeneralDate.fromString(MIN_DATE, FORMAT_DATE_YYYYMMDD);
	}
}
