package nts.uk.shr.com.time.calendar;

import java.util.HashMap;
import java.util.Map;

import lombok.EqualsAndHashCode;
import lombok.Value;
import nts.arc.time.GeneralDate;
import nts.arc.layer.dom.DomainObject;

/**
 * Represents month and day in any year.
 */
@Value
@EqualsAndHashCode(callSuper=false)
public class MonthDay extends DomainObject {
	
	/** MAX_DAYS */
	private static final Map<Integer, Integer> MAX_DAYS;
	static {
		MAX_DAYS = new HashMap<>();
		MAX_DAYS.put(1, 31);
		MAX_DAYS.put(2, 28);
		MAX_DAYS.put(3, 31);
		MAX_DAYS.put(4, 30);
		MAX_DAYS.put(5, 31);
		MAX_DAYS.put(6, 30);
		MAX_DAYS.put(7, 31);
		MAX_DAYS.put(8, 31);
		MAX_DAYS.put(9, 30);
		MAX_DAYS.put(10, 31);
		MAX_DAYS.put(11, 30);
		MAX_DAYS.put(12, 31);
	}

	/** number (1-12) */
	private final int month;
	
	/** day (1-31) */
	private final int day;
	
	@Override
	public void validate() {
		Integer maxDays = MAX_DAYS.get(this.month);
		if (maxDays == null) {
			throw new RuntimeException("Invalid month: " + this.month);
		}
		
		if (this.day > maxDays) {
			throw new RuntimeException("Invalid day '" + this.day + "' in month '" + this.month + "'");
		}
	}

	/**
	 * Returns date with year.
	 * 
	 * @param year year
	 * @return date
	 */
	public GeneralDate toDate(int year) {
		return GeneralDate.ymd(year, this.month, this.day);
	}
}
