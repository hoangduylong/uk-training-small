package nts.uk.ctx.sys.portal.app.find.webmenu;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
/**
 * 表示するメニュー
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
@Getter
public class MobileMenuDto {
	
	/**
	 * メニューコード
	 */
	public String menuCD;
	
	/**
	 * 表示名
	 */
	public String menuName;
	
	/**
	 * 表示順
	 */
	public int displayOrder;
	
	public String url;
	
	public List<MobileMenuChildDto> childLst;
	
}
