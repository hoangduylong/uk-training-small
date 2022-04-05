package nts.uk.ctx.sys.portal.app.screenquery.topppagepart.createflowmenu;

import lombok.Builder;
import lombok.Data;

/**
 * フローメニューレイアウトの矢印設定DTO
 */
@Data
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
