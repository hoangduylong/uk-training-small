package nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * フローメニューレイアウトの添付ファイル設定DTO
 */
@Getter
@Builder
public class FileAttachmentSettingDto {
	
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
	 * 添付ファイルID																	
	 */
	private String fileId;
	
	/**
	 * リンク内容									
	 */
	private String linkContent;
	
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
