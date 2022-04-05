package nts.uk.ctx.bs.employee.pub.workplace.workplacegroup.hospitalofficeinfo;

import lombok.Value;
import nts.arc.time.calendar.period.DatePeriod;
import nts.arc.time.clock.ClockHourMinuteSpan;

/**
 * 病棟夜勤運用ルール
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.病棟・事業所情報.Export.病棟・事業所情報Publish.病棟夜勤運用ルール
 * @author kumiko_otake
 */
@Value
public class HospitalWardNishgShiftOperationRuleExport {

	/** 期間 **/
	private final DatePeriod period;
	/** 夜勤時間帯 **/
	private final ClockHourMinuteSpan timespan;

}
