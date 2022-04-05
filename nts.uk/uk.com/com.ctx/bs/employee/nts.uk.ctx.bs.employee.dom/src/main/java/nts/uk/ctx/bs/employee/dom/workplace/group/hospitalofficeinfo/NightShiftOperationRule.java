package nts.uk.ctx.bs.employee.dom.workplace.group.hospitalofficeinfo;

import java.util.Optional;

import lombok.Value;
import lombok.val;
import nts.arc.error.BusinessException;
import nts.arc.time.clock.ClockHourMinute;
import nts.arc.time.clock.ClockHourMinuteSpan;
import nts.uk.shr.com.enumcommon.NotUseAtr;
/**
 * 夜勤運用ルール
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.社員.職場.職場グループ.病棟・事業所情報.夜勤運用ルール
 * @author lan_lt
 */
@Value
public class NightShiftOperationRule {
	/** 夜勤運用区分*/
	private NotUseAtr nightShiftOperationAtr;
	
	/**　時間帯*/
	private Optional<ClockHourMinuteSpan> shiftTime;
	
	/**
	 * 夜勤運用なしで作る
	 * @return
	 */
	public static NightShiftOperationRule createByNightShiftNotUse() {
		return new NightShiftOperationRule(NotUseAtr.NOT_USE, Optional.empty());
	}
	
	/**
	 * 夜勤運用ありで作る	
	 * @param shiftTime 夜勤時間帯
	 * @return
	 */
	public static NightShiftOperationRule createByNightShiftUse(ClockHourMinuteSpan shiftTime) {
		val shiftTimeStandard = new ClockHourMinuteSpan(ClockHourMinute.hm(22, 00), ClockHourMinute.hm(29, 00));
		val check16Hours = shiftTime.end().backByHours(16).equals(shiftTime.start());
		if(!(shiftTime.contains(shiftTimeStandard) && check16Hours)) {
			throw new BusinessException("Msg_2090");
		}
		return new NightShiftOperationRule(NotUseAtr.USE, Optional.of(shiftTime));
	}
}
