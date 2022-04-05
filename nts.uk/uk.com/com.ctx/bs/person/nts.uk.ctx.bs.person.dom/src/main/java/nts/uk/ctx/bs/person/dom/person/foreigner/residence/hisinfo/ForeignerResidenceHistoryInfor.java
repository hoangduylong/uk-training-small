/**
 * 
 */
package nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.strategic.UnduplicatableHistory;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * 外国人在留履歴情報の履歴
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ForeignerResidenceHistoryInfor
		implements UnduplicatableHistory<HistoryItemsForDatePeriod, DatePeriod, GeneralDate> {
	
	/** 個人ID */
	private String PersonID;

	/** 年月日期間の汎用履歴項目 */
	private List<HistoryItemsForDatePeriod> lstHistoryItemsForDatePeriod;


	@Override 
	public List<HistoryItemsForDatePeriod> items() {
		return lstHistoryItemsForDatePeriod;
	}

}
