/**
 * 
 */
package nts.uk.ctx.sys.portal.dom.enums;

/**
 * @author hieult
 *
 */
public enum MenuAtr {

	/**0:メニュー */
	Menu(0),
	/**1:区切り線 */
	SeparatorLine(1);
	
	public int value;

	MenuAtr(int type) {
		this.value = type;
	}

}
