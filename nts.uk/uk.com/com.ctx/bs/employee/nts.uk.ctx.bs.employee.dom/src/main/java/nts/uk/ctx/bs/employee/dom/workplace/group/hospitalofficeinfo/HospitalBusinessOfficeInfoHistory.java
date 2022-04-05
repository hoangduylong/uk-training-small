package nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.objecttype.DomainAggregate;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.com.history.strategic.PersistentHistory;
/**
 * 病棟・事業所情報履歴
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.病棟・事業所情報.病棟・事業所情報履歴
 * @author lan_lt
 *
 */
@Getter
@AllArgsConstructor
public class HospitalBusinessOfficeInfoHistory implements DomainAggregate, PersistentHistory<DateHistoryItem, DatePeriod, GeneralDate> {
	/** 職場グルーブID　*/
	private final String workplaceGroupId;
	
	/**履歴*/
	private final List<DateHistoryItem> historyItems;
	
	@Override
	public List<DateHistoryItem> items() {
		return this.historyItems;
	}
}
