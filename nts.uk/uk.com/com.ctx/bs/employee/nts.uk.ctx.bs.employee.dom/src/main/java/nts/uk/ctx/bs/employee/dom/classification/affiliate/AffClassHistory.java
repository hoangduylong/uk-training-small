/**
 * 
 */
package nts.uk.ctx.bs.employee.dom.classification.affiliate;

import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.com.history.strategic.PersistentResidentHistory;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * @author danpv
 *
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AffClassHistory extends AggregateRoot
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
	 * 履歴
	 */
	private List<DateHistoryItem> periods;

	@Override
	public List<DateHistoryItem> items() {
		return periods;
	}
	
	public List<String> getHistoryIds() {
		return periods.stream().map( period -> period.identifier()).collect(Collectors.toList());
	}
	
}
