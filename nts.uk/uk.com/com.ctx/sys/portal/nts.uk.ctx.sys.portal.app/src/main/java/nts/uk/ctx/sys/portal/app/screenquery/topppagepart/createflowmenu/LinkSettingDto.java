package nts.uk.ctx.sys.portal.app.screenquery.topppagepart.createflowmenu;

import lombok.Builder;
import lombok.Data;

/**
 * フローメニューレイアウトのリンク設定DTo
 */
@Data
@Builder
public class LinkSettingDto {

	/**
	 * 会社ID									
	 */
	private String cid;
	
	/**
	 * フローメニューコード									
	 */
	private String flowMenuCode;
	
	/**
	 * column																
	 */
	private int column;
	
	/**
	 * row									
	 */
	private int row;
	
	/**
	 * ラベル内容									
	 */
	private String linkContent;
	
	/**
	 * URL									
	 */
	private String url;
	
	/**
	 * width
	 */
	private int width;
	
	/**
	 * height
	 */
	private int height;
	
	/**
	 * 文字のサイズ									
	 */
	private int fontSize;
	
	/**
	 * 太字
	 */
	private int bold;
	
	/**
	 * 横の位置
	 */
	private int horizontalPosition;
	
	/**
	 * 縦の位置
	 */
	private int verticalPosition;
}
