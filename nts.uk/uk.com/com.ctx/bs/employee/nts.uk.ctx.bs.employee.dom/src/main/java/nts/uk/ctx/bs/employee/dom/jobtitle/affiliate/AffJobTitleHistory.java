/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.jobtitle.affiliate;

import java.util.List;
import java.util.stream.Collectors;

import lombok.Getter;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.com.history.strategic.PersistentResidentHistory;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class AffJobTitleHistory.
 */
// 所属職位履歴
@Getter
@Setter
public class AffJobTitleHistory extends AggregateRoot
		implements PersistentResidentHistory<DateHistoryItem, DatePeriod, GeneralDate> {

	/** The company id. */
	private String companyId;

	/** The employee id. */
	// 社員ID
	private String employeeId;

	/** The history items. */
	// 履歴項目
	private List<DateHistoryItem> historyItems;

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.shr.com.history.History#items()
	 */
	@Override
	public List<DateHistoryItem> items() {
		return historyItems;
	}

	/**
	 * Instantiates a new aff job title history.
	 */
	public AffJobTitleHistory() {
		super();
	}

	/**
	 * Instantiates a new aff job title history.
	 *
	 * @param companyId
	 *            the company id
	 * @param employeeId
	 *            the employee id
	 * @param historyItems
	 *            the history items
	 */
	public AffJobTitleHistory(String companyId, String employeeId,
			List<DateHistoryItem> historyItems) {
		super();
		this.companyId = companyId;
		this.employeeId = employeeId;
		this.historyItems = historyItems;
	}
	
	public List<String> getHistoryIds() {
		return historyItems.stream().map(x -> x.identifier()).collect(Collectors.toList());
	}

}
