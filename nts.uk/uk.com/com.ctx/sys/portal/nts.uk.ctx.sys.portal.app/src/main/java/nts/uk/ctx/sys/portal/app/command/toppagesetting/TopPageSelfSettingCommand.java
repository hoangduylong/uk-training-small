package nts.uk.ctx.sys.portal.app.command.toppagesetting;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TopPageSelfSettingCommand {
	/** The employee id. */
	private String employeeId;
	
	/** The top page code. */
	private String code;
}
