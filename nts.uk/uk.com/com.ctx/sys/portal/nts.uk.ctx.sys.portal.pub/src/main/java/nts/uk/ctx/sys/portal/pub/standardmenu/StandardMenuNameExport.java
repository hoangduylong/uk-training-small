package nts.uk.ctx.sys.portal.pub.standardmenu;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StandardMenuNameExport {
	/**
	 * プログラムID
	 */
	private String programId;

	/**
	 * 遷移先の画面ID
	 */
	private String screenId;

	/**
	 * クエリ文字列
	 */
	private String queryString;

	/**
	 * 表示名称
	 */
	private String displayName;

	private String url;

	private String menuCode;

	private Integer system;

	private Integer menuClassification;

}
