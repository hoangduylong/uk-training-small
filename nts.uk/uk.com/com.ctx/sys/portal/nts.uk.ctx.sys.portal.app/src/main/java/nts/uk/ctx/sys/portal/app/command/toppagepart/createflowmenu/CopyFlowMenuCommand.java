package nts.uk.ctx.sys.portal.app.command.toppagepart.createflowmenu;

import lombok.Data;
import nts.uk.ctx.sys.portal.app.screenquery.topppagepart.createflowmenu.CreateFlowMenuDto;

@Data
public class CopyFlowMenuCommand {
	/**
	 * フローメニューコード
	 */
	private String flowMenuCode;
	
	/**
	 * フローメニュー作成
	 */
	private CreateFlowMenuDto createFlowMenu;
}
