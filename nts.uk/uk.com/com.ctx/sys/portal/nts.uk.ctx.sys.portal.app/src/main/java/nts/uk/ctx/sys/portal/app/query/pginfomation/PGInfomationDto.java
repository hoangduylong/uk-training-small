package nts.uk.ctx.sys.portal.app.query.pginfomation;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PGInfomationDto {
	
	/**
	 * プログラムID
	 */
	private String programId;
	
	/**
	 * ログイン履歴の記録
	 */
	private TargetSettingDto loginHistoryRecord;
	
	/**
	 * 修正履歴の記録
	 */
	private TargetSettingDto editHistoryRecord;
	
	/**
	 * 機能名
	 */
	private String functionName;
	
	/**
	 * メニュー分類
	 */
	private Integer menuClassification;
	
	/**
	 * 起動履歴の記録
	 */
	private TargetSettingDto bootHistoryRecord;
	
	/**
	 * プログラムコード
	 */
	private String programCd;

}
