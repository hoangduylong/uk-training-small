package nts.uk.ctx.sys.portal.app.find.logsettings;

import lombok.Data;
import nts.uk.ctx.sys.portal.dom.logsettings.LogSetting;

/** 
 * Dto ログ設定
 * @author Tung
 *
 */
@Data
public class LogSettingDto implements LogSetting.MementoGetter, LogSetting.MementoSetter {

	/**
	 * システム
	 */
	private Integer system;

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
	
	public static LogSettingDto fromDomain(LogSetting logSetting) {
		LogSettingDto logSettingDto = new LogSettingDto();
		logSetting.setMemento(logSettingDto);
		return logSettingDto;
	}
	
}
