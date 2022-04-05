package nts.uk.ctx.sys.log.app.find.reference.record;

import lombok.Data;

/** 
 * Dto ログ設定
 *
 */
@Data
public class LogSettingDto {

	/**
	 *  プログラムID 
	 */
	private String programId;

	/**
	 * メニュー分類
	 */
	private Integer menuClassification;

	/**
	 * ログイン履歴記録
	 */
	private Integer loginHistoryRecord;

	/**
	 * 起動履歴記録
	 */
	private Integer startHistoryRecord;

	/**
	 * 修正履歴（データ）記録
	 */
	private Integer updateHistoryRecord;

	/**
	 * 会社ID
	 */
	private String companyId;
	
	/**
	 * プログラムコード
	 */
	private String programCd;
}
