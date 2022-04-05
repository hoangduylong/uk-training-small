package nts.uk.ctx.bs.employee.ws.groupcommonmaster;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.bs.employee.app.command.groupcommonmaster.SaveCommonMasterCmdHandler;
import nts.uk.ctx.bs.employee.app.command.groupcommonmaster.SaveCommonMasterCommand;
import nts.uk.ctx.bs.employee.app.command.groupcommonmaster.SaveGroupCommonMasterCommand;
import nts.uk.ctx.bs.employee.app.command.groupcommonmaster.SaveGroupCommonMasterCommandHandler;
import nts.uk.ctx.bs.employee.app.command.groupcommonmaster.UpdateCommonMasterCmdHandler;
import nts.uk.ctx.bs.employee.app.command.groupcommonmaster.UpdateCommonMasterCommand;
import nts.uk.ctx.bs.employee.app.command.groupcommonmaster.UpdateMasterItemDisplayCmdHandler;
import nts.uk.ctx.bs.employee.app.command.groupcommonmaster.UpdateMasterItemDisplayCommand;
import nts.uk.ctx.bs.employee.app.find.groupcommonmaster.GroupCommonItemDto;
import nts.uk.ctx.bs.employee.app.find.groupcommonmaster.GroupCommonMasterDto;
import nts.uk.ctx.bs.employee.app.find.groupcommonmaster.GroupCommonMasterFinder;
import nts.uk.ctx.bs.employee.app.find.groupcommonmaster.ScreenBSelectCommonMasterDto;

/**
 * 
 * @author sonnlb
 *
 */
@Path("bs/employee/group_common_master")
@Produces(MediaType.APPLICATION_JSON)
public class GroupCommonMasterWebServices extends WebService {

	@Inject
	private GroupCommonMasterFinder commonFinder;

	@Inject
	private SaveGroupCommonMasterCommandHandler saveHandler;

	@Inject
	private UpdateMasterItemDisplayCmdHandler updateMasterItem;

	@Inject
	private UpdateCommonMasterCmdHandler updateCommon;

	@Inject
	private SaveCommonMasterCmdHandler saveCommon;

	@POST
	@Path("get_master")
	public List<GroupCommonMasterDto> getMaster() {
		return this.commonFinder.getMaster();
	}

	@POST
	@Path("get_items")
	public List<GroupCommonItemDto> getItems(GetItemParam param) {
		return this.commonFinder.getItems(param.getCommonMasterId());
	}

	@POST
	@Path("save_master")
	public void getCurrentHistoryItem(SaveGroupCommonMasterCommand command) {
		this.saveHandler.handle(command);
	}

	@POST
	@Path("get-items-B-screen-start")
	public ScreenBSelectCommonMasterDto getCommonItems(CommonItemParam param) {
		return this.commonFinder.getScreenBStart(param.getCommonMasterId());
	}

	@POST
	@Path("get-items-B-screen")
	public ScreenBSelectCommonMasterDto selectScreenBGetItem(CommonItemParam param) {
		return this.commonFinder.selectScreenBGetItem(param.getCommonMasterId());
	}

	@POST
	@Path("update-items-B-screen")
	public void updateCommonItems(UpdateMasterItemDisplayCommand command) {
		this.updateMasterItem.handle(command);
	}

	@POST
	@Path("update-common-C-screen")
	public void updateCommonMaster(UpdateCommonMasterCommand command) {
		this.updateCommon.handle(command);
	}

	@POST
	@Path("start-page-a")
	public List<GroupCommonMasterDto> startPageA(StartPageAParamDto param) {
		return this.commonFinder.startPageA(param.getConfirmed());
	}

	@POST
	@Path("save-items")
	public void saveItems(SaveCommonMasterCommand command) {
		this.saveCommon.handle(command);
	}

	@POST
	@Path("get-items/{commonMasterId}")
	public List<GroupCommonItemDto> getMasterItems(@PathParam("commonMasterId") String commonMasterId) {
		return this.commonFinder.getItems(commonMasterId);
	}
}
