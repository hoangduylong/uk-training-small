package nts.uk.ctx.sys.shared.dom.toppagealarmset;
/**
 * 利用区分
 * @author yennth
 *
 */
public enum UseAtr {
	/** スケジュール作成 */
	USE(1),
	/** 日別実績の作成 */
	NOT_USE(0);
	public final int value;
	private UseAtr(int type){
		this.value = type;
	}
}
