/**
 * @author hieult
 */
package nts.uk.ctx.sys.portal.ws.flowmenu;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.infra.file.storage.StoredFileStreamService;
import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.portal.app.command.flowmenu.CreateFlowMenuCommand;
import nts.uk.ctx.sys.portal.app.command.flowmenu.CreateFlowMenuCommandHandler;
import nts.uk.ctx.sys.portal.app.command.flowmenu.DeleteFlowMenuCommand;
import nts.uk.ctx.sys.portal.app.command.flowmenu.DeleteFlowMenuCommandHandler;
import nts.uk.ctx.sys.portal.app.command.flowmenu.UpdateFlowMenuCommand;
import nts.uk.ctx.sys.portal.app.command.flowmenu.UpdateFlowMenuCommandHandler;
import nts.uk.ctx.sys.portal.app.find.flowmenu.FlowMenuDto;
import nts.uk.ctx.sys.portal.app.find.flowmenu.FlowMenuFinder;

@Path("sys/portal/flowmenu")
@Produces("application/json")
/**
 * @author hieult
 */
public class FlowMenuWebservice extends WebService {

	@Inject
	private CreateFlowMenuCommandHandler createFlowMenu;

	@Inject
	private DeleteFlowMenuCommandHandler deleteFlowMenu;

	@Inject
	private UpdateFlowMenuCommandHandler updateFlowMenu;

	@Inject
	private FlowMenuFinder finder;

	@Inject
	private StoredFileStreamService storedFileStreamService;
	
	@POST
	@Path("findall")
	public List<FlowMenuDto> getAllFlowMenu() {
		return this.finder.getAllFlowMenu();
	}

	@POST
	@Path("findbycode")
	public FlowMenuDto getByCode(String toppagePartID) {
		return this.finder.getFlowMenu(toppagePartID);
	}
	
	@POST
	@Path("create")
	public void createFlowMenu(CreateFlowMenuCommand command) {
		this.createFlowMenu.handle(command);
	}

	@POST
	@Path("delete")
	public void deleteFlowMenu(DeleteFlowMenuCommand command) {
		this.deleteFlowMenu.handle(command);
	}
	
	@POST
	@Path("update")
	public void UpdateFlowMenu(UpdateFlowMenuCommand command) {
		this.updateFlowMenu.handle(command);
	}

	@POST
	@Path("delete/file")
	public void deleteFile(DeleteFileCommand command) {
		this.storedFileStreamService.delete(command.getFileId());
	}
	
}
