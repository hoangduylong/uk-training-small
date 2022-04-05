/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.jobtitle.dto;

import lombok.Data;
import nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistorySetMemento;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class JobTitleHistoryFindDto.
 */
@Data
public class JobTitleHistoryFindDto implements JobTitleHistorySetMemento {

	/** The history id. */
	private String historyId;

	/** The period. */
	private PeriodFindDto period;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistorySetMemento#
	 * setHistoryId(nts.uk.ctx.bs.employee.dom.jobtitle.history.HistoryId)
	 */
	@Override
	public void setHistoryId(String historyId) {
		this.historyId = historyId;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.bs.employee.dom.jobtitle.history.JobTitleHistorySetMemento#
	 * setPeriod(nts.uk.ctx.bs.employee.dom.jobtitle.history.Period)
	 */
	@Override
	public void setPeriod(DatePeriod period) {
		this.period = new PeriodFindDto(period.start(), period.end());
	}
}
