package nts.uk.ctx.sys.portal.dom.toppagesetting;

/**
 * 
 * @author sonnh1
 *
 */
public enum PersonPermissionSetting {
	/**
	 * 0-設定不可
	 */
	NOT_SET(0),
	/**
	 * 1-設定可
	 */
	SET(1);
	public final int value;

	PersonPermissionSetting(int type) {
		this.value = type;
	}
}
