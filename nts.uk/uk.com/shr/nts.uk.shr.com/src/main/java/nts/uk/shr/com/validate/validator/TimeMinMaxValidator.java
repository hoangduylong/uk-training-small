package nts.uk.shr.com.validate.validator;

import java.util.Optional;

import nts.uk.shr.com.enumcommon.DayAttr;
import nts.uk.shr.com.time.TimeWithDayAttr;

public class TimeMinMaxValidator {

	public static Optional<String> validateMinMax(int min, int max, String value) {
		int minutes = getMinutes(value);
		
		return compareMinMax(min, max, minutes);
	}
	
	public static Optional<String> validateMinMaxTimePoint(int min, int max, String value, DayAttr dayAttr) {
		int minutes = getMinutes(value) + getMinutesOfDayAttr(dayAttr);
		
		return compareMinMax(min, max, minutes);
	}
	
	private static int getMinutes(String value) {
		String[] times = value.split(":");
		int hour = Integer.parseInt(times[0]);
		int minute = Integer.parseInt(times[1]);	
		return hour * 60 + minute;
	}
	
	private static int getMinutesOfDayAttr (DayAttr dayAttr) {
		if (dayAttr == null) {
			return 0;
		}
		switch (dayAttr) {
		case TWO_DAY_LATER:
			return TimeWithDayAttr.MAX_MINUTES_IN_DAY * 2;
		case THE_NEXT_DAY:
			return TimeWithDayAttr.MAX_MINUTES_IN_DAY * 1;
		case THE_PREVIOUS_DAY:
			return TimeWithDayAttr.MAX_MINUTES_IN_DAY * -1;
		case TWO_DAY_EARLIER:
			return TimeWithDayAttr.MAX_MINUTES_IN_DAY * -2;
		default:
			return 0;
		}
	}

	private static Optional<String> compareMinMax(int min, int max, int minutes) {
		// validate minimum
		if (minutes < min) {
			return Optional.of(ErrorIdFactory.TimeMinErrorId);
		}

		// validate maximum
		if (minutes > max) {
			return Optional.of(ErrorIdFactory.TimeMaxErrorId);
		}

		return Optional.empty();
	}
	
}
