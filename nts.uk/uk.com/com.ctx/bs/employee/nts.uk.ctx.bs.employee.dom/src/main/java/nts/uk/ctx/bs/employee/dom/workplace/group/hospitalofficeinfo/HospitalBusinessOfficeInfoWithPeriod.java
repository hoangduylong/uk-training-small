package nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo;

import lombok.Value;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * 期間付き病棟・事業所履歴項目
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.病棟・事業所情報.期間付き病棟・事業所履歴項目
 * @author kumiko_otake
 */
@Value
public class HospitalBusinessOfficeInfoWithPeriod {

	/** 期間 **/
	private final DatePeriod period;
	/** 履歴項目 **/
	private final HospitalBusinessOfficeInfo item;

}
