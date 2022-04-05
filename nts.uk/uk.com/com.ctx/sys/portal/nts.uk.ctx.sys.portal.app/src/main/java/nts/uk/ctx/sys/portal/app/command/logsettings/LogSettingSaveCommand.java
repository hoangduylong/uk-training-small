package nts.uk.ctx.sys.portal.app.command.logsettings;

import java.util.List;

import lombok.Data;
import nts.uk.ctx.sys.portal.app.find.logsettings.LogSettingDto;

/**
 * Command ログ設定
 * @author Tung
 *
 */
@Data
public class LogSettingSaveCommand {

	/**
	 * ログ設定
	 */
	private List<LogSettingDto> logSettings;
	
}
