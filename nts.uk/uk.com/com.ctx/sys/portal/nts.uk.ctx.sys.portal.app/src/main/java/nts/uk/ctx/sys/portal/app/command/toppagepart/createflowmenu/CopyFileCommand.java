package nts.uk.ctx.sys.portal.app.command.toppagepart.createflowmenu;

import lombok.Data;

@Data
public class CopyFileCommand {

	/**
	 * C2_3 元設定名
	 */
	private String flowMenuCode;
	
	/**
	 * C3_3 コード
	 */
	private String newFlowMenuCode;
	
	/**
	 * C3_4 名称
	 */
	private String flowMenuName;
}
