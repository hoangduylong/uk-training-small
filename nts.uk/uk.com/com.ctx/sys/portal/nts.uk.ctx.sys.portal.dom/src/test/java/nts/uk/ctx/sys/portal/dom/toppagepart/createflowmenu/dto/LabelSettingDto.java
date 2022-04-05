package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * フローメニューレイアウトのラベル設定DTO
 */
@Getter
@Builder
public class LabelSettingDto {

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
	private String labelContent;
	
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
	 * 文字の色									
	 */
	private String textColor;
	
	/**
	 * 背景の色									
	 */
	private String backgroundColor;
	
	/**
	 * 横の位置
	 */
	private int horizontalPosition;
	
	/**
	 * 縦の位置
	 */
	private int verticalPosition;
}
