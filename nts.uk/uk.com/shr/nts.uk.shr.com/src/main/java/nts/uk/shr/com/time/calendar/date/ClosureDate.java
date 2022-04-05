/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.shr.com.time.calendar.date;

import lombok.Getter;
import nts.arc.layer.dom.DomainObject;
import nts.uk.shr.com.time.calendar.Day;

/**
 * The Class ClosureDate.
 */
// 日付
@Getter
public class ClosureDate extends DomainObject {

	/** The closure day. */
	// 日
	private Day closureDay;

	/** The last day of month. */
	// 末日とする
	private Boolean lastDayOfMonth;

	/**
	 * Instantiates a new closure date.
	 *
	 * @param closureDay
	 *            the closure day
	 * @param lastDayOfMonth
	 *            the last day of month
	 */
	public ClosureDate(Integer closureDay, Boolean lastDayOfMonth) {
		this.closureDay = new Day(lastDayOfMonth ? 1 : closureDay);
		this.lastDayOfMonth = lastDayOfMonth;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((closureDay == null) ? 0 : closureDay.hashCode());
		result = prime * result + ((lastDayOfMonth == null) ? 0 : lastDayOfMonth.hashCode());
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ClosureDate other = (ClosureDate) obj;
		if (closureDay == null) {
			if (other.closureDay != null)
				return false;
		} else if (!closureDay.equals(other.closureDay))
			return false;
		if (lastDayOfMonth == null) {
			if (other.lastDayOfMonth != null)
				return false;
		} else if (!lastDayOfMonth.equals(other.lastDayOfMonth))
			return false;
		return true;
	}
	
}
