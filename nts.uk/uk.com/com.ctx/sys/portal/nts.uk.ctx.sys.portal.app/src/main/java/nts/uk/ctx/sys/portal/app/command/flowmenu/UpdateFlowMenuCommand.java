/**
 * @author hieult
 */
package nts.uk.ctx.sys.portal.app.command.flowmenu;

import lombok.Value;

@Value
public class UpdateFlowMenuCommand {
	private String topPagePartID;	
	//top page code
	private String topPageCode;
	//top page name
	private String topPageName;
	//width size
	private int width;
	//height size
	private int height;
	
	/** File ID */
	private String fileID;
	
	// Def Class Atr
	private int defClassAtr;
}
