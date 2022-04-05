package nts.uk.ctx.sys.shared.dom.toppagealarm;
/**
 * エラーの有無
 * @author yennth
 *
 */
public enum ExistenceError {
	/** エラーなし */
	NO_ERROR(0),
	/** エラーあり */
	HAVE_ERROR(1);
	public final int value;
	private ExistenceError(int type){
		this.value = type;
	}
}
