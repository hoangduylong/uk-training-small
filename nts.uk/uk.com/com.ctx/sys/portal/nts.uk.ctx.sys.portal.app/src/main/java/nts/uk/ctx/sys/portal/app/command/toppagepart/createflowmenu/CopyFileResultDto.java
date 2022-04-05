package nts.uk.ctx.sys.portal.app.command.toppagepart.createflowmenu;

import lombok.AllArgsConstructor;

import lombok.Data;
import nts.uk.ctx.sys.portal.app.screenquery.topppagepart.createflowmenu.CreateFlowMenuDto;

@Data
@AllArgsConstructor
public class CopyFileResultDto {

	/**
	 * フローメニュー作成
	 */
	private CreateFlowMenuDto createFlowMenuDto;
	
	private String htmlContent;
}
