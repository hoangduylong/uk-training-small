package nts.uk.shr.com.time;

import nts.arc.primitive.TimeClockWithSecondsPrimitiveValue;
import nts.arc.primitive.constraint.TimeRange;

/**
 * 日の時刻　（秒あり）
 * This class represents a time point in day, not duration.
 * 
 */
@TimeRange(min = "0:00:00", max = "23:59:59")
public class TimeClockWithSeconds extends TimeClockWithSecondsPrimitiveValue<TimeClockWithSeconds> {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	/**
	 * Constructs.
	 * @param secondsFromZeroOClock seconds from zero o'clock
	 */
	public TimeClockWithSeconds(int secondsFromZeroOClock) {
		super(secondsFromZeroOClock);
	}
}
