package nts.uk.ctx.sys.portal.app.command.webmenu;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CopyWebMenuCommand {
	/**
	 * Current web menu code
	 */
	private String currentWebMenuCode;
	/**
	 * Is allow overwrite if item is existed
	 */
	private boolean allowOverwrite;
	
	private String webMenuCode;

	private String webMenuName;
}
