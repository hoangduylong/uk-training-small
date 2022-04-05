package nts.uk.ctx.bs.person.dom.person.widowhistory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

@Getter
@AllArgsConstructor
public class PersonWidowHistory extends AggregateRoot {

	/**
	 * domain :寡夫寡婦履歴 
	 */ 
	/** 寡夫寡婦ID */
	private String widowHistoryId;
	/** 期間 */
	private DatePeriod period;
	/** 寡夫寡婦区分 */
	private WidowType widowType;

	public static PersonWidowHistory createFromJavaType(String widowHistoryId, GeneralDate startDate,
			GeneralDate endDate, int widowType) {
		return new PersonWidowHistory(widowHistoryId, new DatePeriod(startDate, endDate),
				EnumAdaptor.valueOf(widowType, WidowType.class));
	}

}
