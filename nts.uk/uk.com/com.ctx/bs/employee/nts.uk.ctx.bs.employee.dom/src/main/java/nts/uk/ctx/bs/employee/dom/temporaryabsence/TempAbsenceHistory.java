package nts.uk.ctx.bs.employee.dom.temporaryabsence;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.com.history.strategic.UnduplicatableHistory;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * Domain Name: 休職休業履歴
 * 
 * @author xuan vinh
 * @author danpv
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class TempAbsenceHistory extends AggregateRoot
		implements UnduplicatableHistory<DateHistoryItem, DatePeriod, GeneralDate> {

	/**
	 * 会社ID
	 */
	private String companyId;

	/**
	 * 社員ID
	 */
	private String employeeId;

	/**
	 * 期間
	 */
	private List<DateHistoryItem> dateHistoryItems;

	@Override
	public List<DateHistoryItem> items() {
		return this.dateHistoryItems;
	}

	public List<String> getHistoryIds() {
		return dateHistoryItems.stream().map(x -> x.identifier()).collect(Collectors.toList());
	}

	public Optional<String> getHistoryId(GeneralDate standardDate) {
		Optional<DateHistoryItem> dateHistoryItem = dateHistoryItems.stream().filter(
				histItem -> histItem.start().beforeOrEquals(standardDate) && histItem.end().afterOrEquals(standardDate))
				.findFirst();
		if (!dateHistoryItem.isPresent()) {
			return Optional.empty();
		}
		return Optional.of(dateHistoryItem.get().identifier());
	}

}
