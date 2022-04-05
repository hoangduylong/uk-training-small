package nts.uk.ctx.sys.portal.app.find.standardmenu;

import lombok.Data;
import nts.uk.ctx.sys.portal.dom.standardmenu.LogSettingDisplay;

/**
 * Dto ログ設定表示
 * @author Tung
 *
 */
@Data
public class LogSettingDisplayDto {
	
	/**
	 * ログイン履歴表示区分
	 */
	private Integer logLoginDisplay;
	
	/**
	 * 起動履歴表示区分
	 */
	private Integer logStartDisplay;
	
	/**
	 * 修正履歴表示区分
	 */
	private Integer logUpdateDisplay;
	
	public static LogSettingDisplayDto fromDomain(LogSettingDisplay domain) {
		LogSettingDisplayDto dto = new LogSettingDisplayDto();
		dto.logLoginDisplay = domain.getLogLoginDisplay().value;
		dto.logStartDisplay = domain.getLogStartDisplay().value;
		dto.logUpdateDisplay = domain.getLogUpdateDisplay().value;
		return dto;
	}

}
