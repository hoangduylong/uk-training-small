package nts.uk.shr.com.time;

import nts.arc.primitive.TimeClockPrimitiveValue;
import nts.arc.primitive.constraint.TimeRange;

/**
 * 勤怠時刻
 * This class represents a time point in day, not duration.
 * 
 * @author m_kitahira
 */
@TimeRange(min = "0:00", max = "23:59")
public class AttendanceClock extends TimeClockPrimitiveValue<AttendanceClock> {
	
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	/**
	 * Constructs.
	 * @param minutesFromZeroOClock minutes from zero o'clock
	 */
	public AttendanceClock(int minutesFromZeroOClock) {
		super(minutesFromZeroOClock);
	}
}
