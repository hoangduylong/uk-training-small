package nts.uk.shr.com.security.audittrail.correction.content.pereg;

import java.util.Optional;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.arc.enums.EnumAdaptor;
import nts.arc.time.GeneralDate;
import nts.arc.time.YearMonth;

/**
 * 対象データKEY情報
 */
public class TargetDataKey {
	
	@Getter
	private final CalendarKeyType calendarKeyType;

	/** 年月日 */
	@Getter
	private final Optional<GeneralDate> dateKey;
	
	/** 文字列KEY */
	@Getter
	private final Optional<String> stringKey;
	
	public TargetDataKey(CalendarKeyType calendarKeyType, GeneralDate dateKey, String stringKey) {
		this.calendarKeyType = calendarKeyType;
		this.dateKey = Optional.ofNullable(dateKey);
		this.stringKey = Optional.ofNullable(stringKey);
	}
	
	public static TargetDataKey of(GeneralDate dateKey) {
		return new TargetDataKey(CalendarKeyType.DATE, dateKey, null);
	}
	
	public static TargetDataKey of(YearMonth yearMonthKey) {
		return new TargetDataKey(
				CalendarKeyType.YEARMONTH,
				GeneralDate.ymd(yearMonthKey.year(), yearMonthKey.month(), 1),
				null);
	}
	
	public static TargetDataKey of(int yearKey) {
		return new TargetDataKey(
				CalendarKeyType.DATE,
				GeneralDate.ymd(yearKey, 1, 1),
				null);
	}

	public static TargetDataKey of(String stringKey) {
		return new TargetDataKey(CalendarKeyType.NONE, null, stringKey);
	}
	
	public static TargetDataKey of(GeneralDate dateKey, String stringKey) {
		return new TargetDataKey(CalendarKeyType.DATE, dateKey, stringKey);
	}
	
	public static TargetDataKey of(YearMonth yearMonthKey, String stringKey) {
		return new TargetDataKey(CalendarKeyType.YEARMONTH, 
				GeneralDate.ymd(yearMonthKey.year(), yearMonthKey.month(), 1), stringKey);
	}
	
	public static TargetDataKey of(int yearKey, String stringKey) {
		return new TargetDataKey(CalendarKeyType.YEAR, 
				GeneralDate.ymd(yearKey, 1, 1), stringKey);
	}
	
	
	@RequiredArgsConstructor
	public enum CalendarKeyType {
		NONE(0),
		DATE(1),
		YEARMONTH(2),
		YEAR(3),
		;
		public final int value;
		
		public static CalendarKeyType of(int value) {
			return EnumAdaptor.valueOf(value, CalendarKeyType.class);
		}
	}
}
