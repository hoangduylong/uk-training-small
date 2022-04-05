package nts.uk.ctx.bs.employee.dom.workplace.affiliate;

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
 * The Class AffiliationWorkplaceHistory.
 * Class AffWorkplaceHistory sau se xoa di
 */
// 所属職場履歴
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AffWorkplaceHistory extends AggregateRoot implements PersistentResidentHistory<DateHistoryItem, DatePeriod, GeneralDate> {
	/** 会社ID */
	private String companyId;
	
	/** The employee id. */
	// 社員ID
	private String employeeId;

	/** The Date History Item. */
	// 履歴項目
	private List<DateHistoryItem> historyItems;

	@Override
	public List<DateHistoryItem> items() {
		return historyItems;
	}
	
	public List<String> getHistoryIds() {
		return historyItems.stream().map(dateItem -> dateItem.identifier()).collect(Collectors.toList());
	}

}
