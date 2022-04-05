package nts.uk.ctx.sys.portal.pub.toppagealarm;

public enum AlarmClassification {
	/** アラームリスト */
	ALARM_LIST(0),
	
	/** 更新処理自動実行業務エラー */
	AUTO_EXEC_BUSINESS_ERR(1),
	
	/** 更新処理自動実行動作異常 */
	AUTO_EXEC_OPERATION_ERR(2),
	
	/** ヘルス×ライフメッセージ */
	HEALTH_LIFE_MESSAGE(3);

	public final int value;

	private AlarmClassification(int type) {
		this.value = type;
	}
}
