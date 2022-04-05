package nts.uk.ctx.sys.log.app.find.reference.record;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LogParams {

	/**
	 *List<対象者>
	 */
	private List<String> listTagetEmployeeId;
	
	/**
	 *List<操作者>
	 */
	private List<String> listOperatorEmployeeId;
	
	/**
	 *Optional＜対象期間＞
	 */
	private GeneralDate startDateTaget;
	
	/**
	 *Optional＜対象期間＞
	 */
	private GeneralDate endDateTaget;
	
	/**
	 *操作期間
	 */
	private GeneralDateTime startDateOperator;
	
	/**
	 *操作期間
	 */
	private GeneralDateTime endDateOperator;
	
	/**
	 * 記録種類
	 */
	private int recordType; //0: logLogin; 1: Log startup; 3 : Log data update persion ; 6: log data correct
	
	/**
	 *データ種類
	 */
	private int targetDataType;
	
	/**
	 * List<ログ設定>
	 * step システムからログ設定を取得
	 * Because log setting is coded on portal.
	 * But EAP don't have pub/ac to call it to here.
	 * So i have no choice that call log setting's API and take it down here.
	 */
	private List<LogSettingDto> listLogSettingDto;
	
	/**
	 * This is condition we get from screen B (表示する項目)
	 */
	private List<ConditionDto> listCondition;
}
