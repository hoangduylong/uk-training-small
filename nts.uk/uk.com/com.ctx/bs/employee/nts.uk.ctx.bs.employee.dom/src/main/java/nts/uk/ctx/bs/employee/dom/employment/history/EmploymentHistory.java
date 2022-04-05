package nts.uk.ctx.bs.employee.dom.employment.history;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.com.history.strategic.PersistentResidentHistory;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class EmploymentHistory.
 */
// 雇用履歴
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmploymentHistory extends AggregateRoot
		implements PersistentResidentHistory<DateHistoryItem, DatePeriod, GeneralDate> {
	
	/**
	 * 会社ID
	 */
	private String companyId;

	/**
	 * 社員ID
	 */
	private String employeeId;

	/**
	 * 履歴項目
	 */
	private List<DateHistoryItem> historyItems;

	@Override
	public List<DateHistoryItem> items() {
		return historyItems;
	}
	
	public List<String> getHistoryIds() {
		return historyItems.stream().map( item -> item.identifier()).collect(Collectors.toList());
	}
}
