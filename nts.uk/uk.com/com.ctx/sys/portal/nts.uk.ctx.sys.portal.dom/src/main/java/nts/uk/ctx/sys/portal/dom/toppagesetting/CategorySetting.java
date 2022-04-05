package nts.uk.ctx.sys.portal.dom.toppagesetting;

/**
 * 
 * @author sonnh1
 * Enum 区分設定
 */
public enum CategorySetting {
	/**
	 * 0 - 分けない
	 */
	NOT_DIVIDE(0),
	/**
	 * 1 - 分ける
	 */
	DIVIDE(1);

	public final int value;

	CategorySetting(int type) {
		this.value = type;
	}
}
