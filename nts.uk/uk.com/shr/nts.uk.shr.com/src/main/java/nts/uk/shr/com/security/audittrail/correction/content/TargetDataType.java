package nts.uk.shr.com.security.audittrail.correction.content;

import lombok.RequiredArgsConstructor;
import nts.arc.enums.EnumAdaptor;

/**
 * 対象データ種類
 */
@RequiredArgsConstructor
public enum TargetDataType {

	/** スケジュール */
	SCHEDULE(0),
	
	/** 日別実績 */
	DAILY_RECORD(1),
	
	/** 月別実績 */
	MONTHLY_RECORD(2),
	
	/** 任意期間集計 */
	ANY_PERIOD_SUMMARY(3),
	
	/** 申請承認 */
	REQUEST_APPROVAL(4),
	
	/** 届出 */
	NOTIFICATION(5),
	
	/** 給与明細 */
	SALARY_DETAIL(6),
	
	/** 賞与明細 */
	BONUS_DETAIL(7),
	
	/** 年末調整 */
	YEAR_END_ADJUSTMENT(8),
	
	/** 月額算定 */
	MONTHLY_CALCULATION(9),
	
	/** 補助月次  昇給遡り*/
	RISING_SALARY_BACK(10);
	
	public final int value;
	
	public static TargetDataType of(int value) {
		return EnumAdaptor.valueOf(value, TargetDataType.class);
	}
}
