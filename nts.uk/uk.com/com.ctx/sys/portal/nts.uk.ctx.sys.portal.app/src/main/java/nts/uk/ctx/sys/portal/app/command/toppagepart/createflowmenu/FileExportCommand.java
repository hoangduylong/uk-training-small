package nts.uk.ctx.sys.portal.app.command.toppagepart.createflowmenu;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FileExportCommand {
	
	/**
	 * フローメニューコード
	 */
	private String flowMenuCode;
	
	/**
	 * HTML
	 */
	private String htmlContent;
}
