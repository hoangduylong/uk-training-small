package nts.uk.ctx.sys.portal.dom.smartphonetoppageset;
/**
 * 種別
 * 
 * @author sonnh1
 *
 */
public enum Type {
	/**
	 * 通知
	 */
	NOTIFICATION(0),
	/**
	 * 勤怠状況
	 */
	TIME_STATUS(1),
	/**
	 * 時間外労働
	 */
	OVERTIME_WORK(2),
	/**
	 * 打刻入力
	 */
	STAMPING(3);
	
	public final int value;

	private Type(int value) {
		this.value = value;
	}
}
