package nts.uk.shr.com.time;

import nts.arc.primitive.TimeClockPrimitiveValue;
import nts.arc.primitive.constraint.TimeRange;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.enumcommon.DayAttr;

/**
 * 時刻（日区分付き）
 * @author m_kitahira
 */
@TimeRange(min = "-12:00", max = "71:59")
public class TimeWithDayAttr extends TimeClockPrimitiveValue<TimeWithDayAttr>{

	public static final int MAX_MINUTES_IN_DAY = 24 * 60;

	/** 12:00 at the previous day */
	public static final TimeWithDayAttr THE_PREVIOUS_DAY_1200 = new TimeWithDayAttr(-12 * 60);
	
	/** 00:00 at the present day */
	public static final TimeWithDayAttr THE_PRESENT_DAY_0000 = new TimeWithDayAttr(0);
	
	/** 00:00 at the next day */
	public static final TimeWithDayAttr THE_NEXT_DAY_0000 = new TimeWithDayAttr(1 * MAX_MINUTES_IN_DAY);
	
	/** 00:00 at two days later */
	public static final TimeWithDayAttr TWO_DAYS_LATER_0000 = new TimeWithDayAttr(2 * MAX_MINUTES_IN_DAY);
	
	/** 23:59 at two days later */
	public static final TimeWithDayAttr TWO_DAYS_LATER_2359 = new TimeWithDayAttr(3 * MAX_MINUTES_IN_DAY - 1);
	
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Constructs.
	 * @param minutesFromZeroOClock elapsed time as minutes from zero o'clock
	 */
	public TimeWithDayAttr(int minutesFromZeroOClock) {
		super(minutesFromZeroOClock);
	}
	
	/**
	 * 時分から作る
	 * @param hour
	 * @param minute
	 * @return
	 */
	public static TimeWithDayAttr hourMinute(int hour, int minute) {
		return new TimeWithDayAttr(hour * 60 + minute);
	}
	
	/**
	 * 日区分と時分から作る
	 * @param day
	 * @param hour
	 * @param minute
	 * @return
	 */
	public static TimeWithDayAttr dayHourMinute(DayAttr day, int hour, int minute) {
		return hourMinute(day.hours + hour, minute);
	}

	/**
	 * OBSOLETE: use dayAttr() instead
	 * @return
	 */
	public DayAttr getDayDivision() {
		return this.dayAttr();
	}
	
	/**
	 * Returns day attribute.
	 * @return day attribute
	 */
	public DayAttr dayAttr(){
		
		switch (this.daysOffset()) {
		case 0:
			return DayAttr.THE_PRESENT_DAY;
		case 1:
			return DayAttr.THE_NEXT_DAY;
		case 2:
			return DayAttr.TWO_DAY_LATER;
		case -1:
			return DayAttr.THE_PREVIOUS_DAY;
		default:
			throw new RuntimeException("not supported day attr: " + this.v());
		}
	}
	
	public int getDayTime(){
		return (Math.abs(this.v()) + MAX_MINUTES_IN_DAY) % MAX_MINUTES_IN_DAY;
	}
	
	public String getInDayTimeWithFormat(){
		return this.hour() + ":" + (this.minute() < 10 ? "0" + this.minute() : this.minute());
	}
	
	public String getRawTimeWithFormat(){
		int rawMinutes = Math.abs(this.v() % 60);
		return rawHour() + ":" + (rawMinutes < 10 ? "0" + rawMinutes : rawMinutes);
	}
	
	public String getFullText() {
		// とりあえず日本語のみに対応
		// 英語等の場合にどうなるか、まだ仕様が決まっていない
		return this.dayAttr().description + this.getInDayTimeWithFormat();
	}
	
	/**
	 * Returns shifted time instance but min="12:00 at previous day" max="23:59 at two days later".
	 * @param minutesToShift
	 * @return shifted time instance
	 */
	public TimeWithDayAttr shiftWithLimit(int minutesToShift) {
		int newValue = this.v() + minutesToShift;
		newValue = Math.max(newValue, THE_PREVIOUS_DAY_1200.v());
		newValue = Math.min(newValue, TWO_DAYS_LATER_2359.v());
		return new TimeWithDayAttr(newValue);
	}

	@Override
	public int hour() {
		return super.hour() % 24;
	}
	
	public int rawHour(){
		return this.v() / 60;
	}
	
	/**
	 * 基準日、対象日、対象時刻から日区分付き時刻に変換する
	 * 
	 * @param baseDate
	 *            基準日
	 * @param targetDate
	 *            対象日
	 * @param timesOfDay
	 *            時刻
	 * @return 時刻（日区分付き）
	 */
	public static TimeWithDayAttr convertToTimeWithDayAttr(GeneralDate baseDate,GeneralDate targetDate, int timesOfDay) {

		// 時刻(日区分付き)．時刻←INPUT．時刻

		// 対象日は基準日から見て何の日か判断する
		if (baseDate.equals(targetDate)) { // 当日
			return new TimeWithDayAttr(timesOfDay);
		} else if (baseDate.addDays(-1).equals(targetDate)) { // 前日
			return new TimeWithDayAttr(timesOfDay - MAX_MINUTES_IN_DAY);
		} else if (baseDate.addDays(1).equals(targetDate)) { // 翌日
			return new TimeWithDayAttr(timesOfDay + MAX_MINUTES_IN_DAY);
		} else if (baseDate.addDays(2).equals(targetDate)) {// 翌々日
			return new TimeWithDayAttr(timesOfDay + 2 * MAX_MINUTES_IN_DAY);
		}
		
		throw new RuntimeException("Error convert : 基準日、対象日、対象時刻から日区分付き時刻に変換する ");
	}

}
