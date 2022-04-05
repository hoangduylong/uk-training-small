package nts.uk.ctx.sys.portal.ws.smartphonetoppage;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.portal.app.command.smartphonetoppageset.UpdateSPTopPageDetailCommand;
import nts.uk.ctx.sys.portal.app.command.smartphonetoppageset.UpdateSPTopPageDetailCommandHandler;
import nts.uk.ctx.sys.portal.app.command.smartphonetoppageset.UpdateSPTopPageSetCommand;
import nts.uk.ctx.sys.portal.app.command.smartphonetoppageset.UpdateSPTopPageSetCommandHandler;
import nts.uk.ctx.sys.portal.app.find.smartphonetoppage.SPTopPageDetailDto;
import nts.uk.ctx.sys.portal.app.find.smartphonetoppage.SPTopPageFinder;
import nts.uk.ctx.sys.portal.app.find.smartphonetoppage.SPTopPageSetDto;

/**
 * 
 * @author sonnh1
 *
 */
@Path("sys/portal/smartphonetoppage")
@Produces("application/json")
public class SmartPhoneTopPageWebService extends WebService {

	@Inject
	private SPTopPageFinder sPTopPageFinder;

	@Inject
	private UpdateSPTopPageSetCommandHandler updateSPTopPageSetCommandHandler;
	
	@Inject
	private UpdateSPTopPageDetailCommandHandler updateSPTopPageDetailCommandHandler;

	@POST
	@Path("getTopPageSet")
	public List<SPTopPageSetDto> getTopPageSet() {
		return this.sPTopPageFinder.getTopPageSet();
	}

	@POST
	@Path("saveData")
	public void saveData(UpdateSPTopPageSetCommand command) {
		this.updateSPTopPageSetCommandHandler.handle(command);
	}

	@POST
	@Path("getTopPageDetail/{mode}")
	public List<SPTopPageDetailDto> getTopPageDetail(@PathParam("mode") int mode) {
		return this.sPTopPageFinder.getTopPageDetail(mode);
	}
	
	@POST
	@Path("saveDataDetail")
	public void saveDataDetail(UpdateSPTopPageDetailCommand command) {
		this.updateSPTopPageDetailCommandHandler.handle(command);
	}
}
