package nts.uk.ctx.sys.shared.dom.toppagealarm;
/**
 * 中止フラグ
 * @author yennth
 *
 */
public enum IsCancelled {
	/** 未読 */
	NOT_CANCELLED(0),
	/** 了解 */
	CANCELLED(1);
	public final int value;
	private IsCancelled(int type){
		this.value = type;
	}
}
