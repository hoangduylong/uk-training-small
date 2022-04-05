package nts.uk.ctx.sys.portal.app.find.webmenu;

import java.util.List;

/**
 * 表示するメニュー
 * @author Doan Duy Hung
 *
 */
public class MenuToDisplayDto {
	/**
	 * メニューコード
	 */
	public String menuCD;
	
	/**
	 * 表示名
	 */
	public String displayName;
	
	/**
	 * 表示順
	 */
	public Integer displayOrder;
	
	/**
	 * 子メニュー
	 */
	public List<ChildMenuDto> childMenuCD;
}
