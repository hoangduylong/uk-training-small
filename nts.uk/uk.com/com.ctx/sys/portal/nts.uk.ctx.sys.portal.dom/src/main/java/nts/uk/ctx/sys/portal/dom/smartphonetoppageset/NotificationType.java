package nts.uk.ctx.sys.portal.dom.smartphonetoppageset;
/**
 * 通知種類
 * 
 * @author sonnh1
 *
 */
public enum NotificationType {
	/**
	 * 承認すべき申請
	 */
	APPLICATION_FOR_APPROVED(0),
	/**
	 * 日別実績承認
	 */
	DAILY_RESULT_APPROVAL(1),
	/**
	 * 月別実績承認
	 */
	MONTHLY_RESULT_APPROVAL(2),
	/**
	 * 日別実績のエラー
	 */
	DAILY_ACTUALS_ERROR(3);
	
	public final int value;

	NotificationType(int value) {
		this.value = value;
	}
}
