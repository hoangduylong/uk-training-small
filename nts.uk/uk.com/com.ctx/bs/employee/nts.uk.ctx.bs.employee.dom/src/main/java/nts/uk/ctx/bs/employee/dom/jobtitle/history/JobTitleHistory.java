/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.jobtitle.history;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.GeneralHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class JobTitleHistory.
 */
//職位履歴
@Getter
public class JobTitleHistory extends GeneralHistoryItem<JobTitleHistory, DatePeriod, GeneralDate> {

	/**
	 * Instantiates a new job title history.
	 *
	 * @param memento the memento
	 */
	public JobTitleHistory(JobTitleHistoryGetMemento memento) {
		super(memento.getHistoryId(), memento.getPeriod());
	}

	/**
	 * Save to memento.
	 *
	 * @param memento the memento
	 */
	public void saveToMemento(JobTitleHistorySetMemento memento) {
		memento.setHistoryId(this.identifier());
		memento.setPeriod(this.span());
	}
	
	/**
	 * Update start date.
	 *
	 * @param newStartDate the new start date
	 */
	public void updateStartDate(GeneralDate newStartDate) {
		this.changeSpan(this.newSpan(newStartDate, this.span().end()));
	}
	
	/**
	 * Update end date.
	 *
	 * @param newEndDate the new end date
	 */
	public void updateEndDate(GeneralDate newEndDate) {
		this.changeSpan(this.newSpan(this.span().start(), newEndDate));
	}
}
