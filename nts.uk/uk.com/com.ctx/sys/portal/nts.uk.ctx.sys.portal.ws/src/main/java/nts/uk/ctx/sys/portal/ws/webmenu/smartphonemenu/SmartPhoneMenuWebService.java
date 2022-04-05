package nts.uk.ctx.sys.portal.ws.webmenu.smartphonemenu;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.portal.app.command.standardmenu.UpdateStandardMenuCommand;
import nts.uk.ctx.sys.portal.app.command.standardmenu.UpdateStandardMenuCommandHandler;
import nts.uk.ctx.sys.portal.app.command.webmenu.smartphonemenu.UpdateSPMenuCommand;
import nts.uk.ctx.sys.portal.app.command.webmenu.smartphonemenu.UpdateSPMenuCommandHandler;
import nts.uk.ctx.sys.portal.app.find.webmenu.smartphonemenu.DataGetByRoleIdDto;
import nts.uk.ctx.sys.portal.app.find.webmenu.smartphonemenu.Ksp001Dto;
import nts.uk.ctx.sys.portal.app.find.webmenu.smartphonemenu.SPMenuDto;
import nts.uk.ctx.sys.portal.app.find.webmenu.smartphonemenu.SPMenuEmpDto;
import nts.uk.ctx.sys.portal.app.find.webmenu.smartphonemenu.SPMenuFinder;
import nts.uk.shr.com.context.AppContexts;

/**
 * 
 * @author sonnh1
 *
 */
@Path("sys/portal/webmenu/smartphonemenu")
@Produces("application/json")
public class SmartPhoneMenuWebService extends WebService {

	@Inject
	private SPMenuFinder sPMenuFinder;

	@Inject
	private UpdateSPMenuCommandHandler updateSPMenuCommandHandler;

	@Inject
	private UpdateStandardMenuCommandHandler updateStandardMenuCommandHandler;
	
	@POST
	@Path("getListMenu")
	public Ksp001Dto getListMenu() {
		return this.sPMenuFinder.getListMenu();
	}

	@POST
	@Path("getDataByRoleId")
	public List<SPMenuEmpDto> getDataByRoleId(DataGetByRoleIdDto param) {
		return this.sPMenuFinder.getMenuSetDisplay(param.getRoleId(), param.getLstMenuCd());
	}

	@POST
	@Path("saveData")
	public void saveData(UpdateSPMenuCommand command) {
		this.updateSPMenuCommandHandler.handle(command);
	}

	@POST
	@Path("changeMenuName")
	public void changeMenuName(UpdateStandardMenuCommand command) {
		this.updateStandardMenuCommandHandler.handle(command);
	}

	@POST
	@Path("getListMenuRole")
	public Ksp001Dto getListMenuRole() {
		String companyId = AppContexts.user().companyId();
		List<SPMenuEmpDto> lstSPMenuEmpDto = this.sPMenuFinder.getListMenuRole(companyId);
		return new Ksp001Dto(new ArrayList<>(), lstSPMenuEmpDto);
	}

	@POST
	@Path("getMenuSpecial")
	public Ksp001Dto getMenuSpecial() {
		String companyId = AppContexts.user().companyId();
		List<SPMenuDto> lstSPMenuDto = this.sPMenuFinder.getMenuSpecial(companyId);
		return new Ksp001Dto(lstSPMenuDto, new ArrayList<>());
	}
	
}
