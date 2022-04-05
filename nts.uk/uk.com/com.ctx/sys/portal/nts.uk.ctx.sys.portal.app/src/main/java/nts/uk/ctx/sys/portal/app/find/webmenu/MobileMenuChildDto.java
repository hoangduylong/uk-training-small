package nts.uk.ctx.sys.portal.app.find.webmenu;

import lombok.AllArgsConstructor;

/**
 * 子メニュー
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
public class MobileMenuChildDto {
	
	/**
	 * コード
	 */
	public String menuCD;
	
	/**
	 * 名称
	 */
	public String menuName;
	
	public String url;
}
