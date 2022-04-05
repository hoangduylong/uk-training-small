package nts.uk.ctx.bs.person.dom.person.info.widowhistory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * 寡夫寡婦履歴
 * 
 * @author xuan vinh
 */

@Getter
@AllArgsConstructor
public class WidowHistory extends AggregateRoot{
	// 寡夫寡婦ID
	private String widowHistoryId;
	// 寡夫寡婦区分
	private WidowType widowType;
	
	private DatePeriod period;

	public static WidowHistory createObjectFromJavaType(String widowHistoryId,
			int widowType, GeneralDate startDate, GeneralDate endDate) {
		return new WidowHistory(widowHistoryId, EnumAdaptor.valueOf(widowType, WidowType.class),
				 new DatePeriod(startDate, endDate));
	}
}
