package nts.uk.ctx.bs.employee.app.command.groupcommonmaster;

import java.util.List;

import lombok.Getter;
/**
 * 
 * @author yennth
 *
 */
@Getter
public class UpdateMasterItemDisplayCommand {
	
	private String commonMasterId;
	
	private List<UpdateMasterItemCommand> listMasterItem;
}
