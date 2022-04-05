
package nts.uk.ctx.sys.portal.app.command.flowmenu;

import lombok.Getter;
import nts.uk.ctx.sys.portal.dom.enums.TopPagePartType;
import nts.uk.ctx.sys.portal.dom.flowmenu.FlowMenu;
import nts.uk.shr.com.context.AppContexts;

/**
 * @author hieult
 */
@Getter
public class CreateFlowMenuCommand {
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
	
	// Def Class attribute	
	private int defClassAtr;
	

	public FlowMenu toDomain(String topPagePartId){
		return FlowMenu.createFromJavaType(AppContexts.user().companyId(), topPagePartId,
				topPageCode, topPageName,
				TopPagePartType.FlowMenu.value, width, height,
				fileID,defClassAtr
				);
	}
}