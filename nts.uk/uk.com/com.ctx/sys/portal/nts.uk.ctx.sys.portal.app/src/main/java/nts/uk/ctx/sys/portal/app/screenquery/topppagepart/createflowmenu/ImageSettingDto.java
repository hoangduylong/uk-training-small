package nts.uk.ctx.sys.portal.app.screenquery.topppagepart.createflowmenu;

import lombok.Builder;
import lombok.Data;

/**
 *  フローメニューレイアウトの画像設定
 */
@Data
@Builder
public class ImageSettingDto {
	
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
	 * 画像ファイルID																								
	 */
	private String fileId;
	
	/**
	 * 画像ファイル名																	
	 */
	private String fileName;
	
	/**
	 * 既定区分
	 */
	private int isFixed;
	
	/**
	 * 比率
	 */
	private double ratio;
	
	/**
	 * width
	 */
	private int width;
	
	/**
	 * height
	 */
	private int height;
}
