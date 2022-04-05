package nts.uk.ctx.bs.employee.dom.workplace.master;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.workplace.config.WorkplaceConfigSetMemento;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.com.history.strategic.ContinuousHistory;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * 
 * @author HungTT - 職場構成
 *
 */

@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class WorkplaceConfiguration extends AggregateRoot
		implements ContinuousHistory<DateHistoryItem, DatePeriod, GeneralDate> {

	/**
	 * 会社ID
	 */
	@Getter
	private String companyId;

	/**
	 * 職場履歴
	 */
	private List<DateHistoryItem> histories;

	@Override
	public List<DateHistoryItem> items() {
		return this.histories;
	}
	
	/**
	 * Save to memento.
	 *
	 * @param memento the memento
	 */
	public void saveToMemento(WorkplaceConfigSetMemento memento) {
		memento.setCompanyId(this.companyId);
		memento.setWkpConfigHistory(this.histories);
	}

}
