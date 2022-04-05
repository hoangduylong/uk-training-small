package nts.uk.ctx.bs.employee.dom.employee.history;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.dom.event.DomainEvent;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.strategic.UnduplicatableHistory;
import nts.arc.time.calendar.period.DatePeriod;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
/** 所属会社履歴（社員別） */
public class AffCompanyHistByEmployee extends DomainEvent
		implements UnduplicatableHistory<AffCompanyHistItem, DatePeriod, GeneralDate> {
	/** 社員ID */
	private String sId;

	/** 履歴 */
	private List<AffCompanyHistItem> lstAffCompanyHistoryItem;

	public AffCompanyHistItem getAffCompanyHistItem(String historyId) {
		if (lstAffCompanyHistoryItem == null) {
			lstAffCompanyHistoryItem = new ArrayList<AffCompanyHistItem>();
		}

		List<AffCompanyHistItem> filter = lstAffCompanyHistoryItem.stream()
				.filter(m -> m.getHistoryId().equals(historyId)).collect(Collectors.toList());

		if (!filter.isEmpty()) {
			return filter.get(0);
		}

		return null;
	}

	public void addAffCompanyHistItem(AffCompanyHistItem domain) {
		this.addAffCompanyHistItemWithoutEvent(domain);
		this.toBePublished();
	}

	public void addAffCompanyHistItemWithoutEvent(AffCompanyHistItem domain) {
		if (lstAffCompanyHistoryItem == null) {
			lstAffCompanyHistoryItem = new ArrayList<AffCompanyHistItem>();
		}

		lstAffCompanyHistoryItem.add(domain);
	}

	@Override
	public List<AffCompanyHistItem> items() {
		return lstAffCompanyHistoryItem;
	}

	public Optional<AffCompanyHistItem> getHistoryWithReferDate(GeneralDate referenceDate) {
		return this.lstAffCompanyHistoryItem.stream()
				.filter(history -> history.getDatePeriod().start().beforeOrEquals(referenceDate)
						&& history.getDatePeriod().end().afterOrEquals(referenceDate))
				.findFirst();
	}

	public Optional<AffCompanyHistItem> getHistoryBeforeReferDate(GeneralDate referenceDate) {
		List<AffCompanyHistItem> matchedListEntryJobHist = this.lstAffCompanyHistoryItem.stream()
				.filter(history -> history.getDatePeriod().end().before(referenceDate)).collect(Collectors.toList());
		if (matchedListEntryJobHist.isEmpty()) {
			return Optional.empty();
		}
		AffCompanyHistItem lastJobEntryHistory = matchedListEntryJobHist.get(0);
		for (AffCompanyHistItem jobEntryHistory : matchedListEntryJobHist) {
			if (jobEntryHistory.getDatePeriod().end().after(lastJobEntryHistory.getDatePeriod().end())) {
				lastJobEntryHistory = jobEntryHistory;
			}
		}
		return Optional.of(lastJobEntryHistory);
	}

	public Optional<AffCompanyHistItem> getHistoryAfterReferDate(GeneralDate referenceDate) {
		List<AffCompanyHistItem> matchedListEntryJobHist = this.lstAffCompanyHistoryItem.stream()
				.filter(history -> history.getDatePeriod().start().after(referenceDate)).collect(Collectors.toList());
		if (matchedListEntryJobHist.isEmpty()) {
			return Optional.empty();
		}
		AffCompanyHistItem firstJobEntryHistory = matchedListEntryJobHist.get(0);
		for (AffCompanyHistItem jobEntryHistory : matchedListEntryJobHist) {
			if (jobEntryHistory.getDatePeriod().start().before(firstJobEntryHistory.getDatePeriod().start())) {
				firstJobEntryHistory = jobEntryHistory;
			}
		}
		return Optional.of(firstJobEntryHistory);
	}

	public Optional<AffCompanyHistItem> getHistory() {

		if (this.lstAffCompanyHistoryItem.isEmpty()) {
			return Optional.empty();
		}
		
		List<AffCompanyHistItem> listHist = this.lstAffCompanyHistoryItem.stream()
				.sorted((first, second) -> second.getDatePeriod().start().compareTo(first.getDatePeriod().start()))
				.collect(Collectors.toList());

		return Optional.of(listHist.get(0));
	}
	
	public DatePeriod getLatestPeriod() {
		return this.lstAffCompanyHistoryItem.get(0).getDatePeriod();
	}
	
	public List<AffCompanyHistItem> historyIncludePeriod(DatePeriod period) {
		return lstAffCompanyHistoryItem.stream().filter(histItem -> histItem.includePeriod(period))
				.collect(Collectors.toList());
	}
	
	public boolean hasPreviousHistory(GeneralDate standardDate) {
		for (AffCompanyHistItem histItem : lstAffCompanyHistoryItem) {
			if (histItem.beforeOrEqualsStandardDate(standardDate)) {
				return true;
			}
		}
		return false;
	}
	
	public boolean hasAfterHistory(GeneralDate standardDate) {
		for (AffCompanyHistItem histItem : lstAffCompanyHistoryItem) {
			if (histItem.afterOrEqualsStandardDate(standardDate)) {
				return true;
			}
		}
		return false;
	}

}
