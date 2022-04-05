package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * フローメニューレイアウトの矢印設定DTO
 */
@Getter
@Builder
public class ArrowSettingDto {

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
	 * 矢印ファイル名																								
	 */
	private String fileName;
	
	/**
	 * width
	 */
	private int width;
	
	/**
	 * height
	 */
	private int height;
}
