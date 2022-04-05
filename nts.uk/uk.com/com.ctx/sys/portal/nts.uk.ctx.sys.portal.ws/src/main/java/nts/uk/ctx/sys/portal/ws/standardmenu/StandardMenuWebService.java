package nts.uk.ctx.sys.portal.ws.standardmenu;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nts.arc.layer.app.command.JavaTypeResult;
import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.portal.app.command.standardmenu.StandardMenuCommand;
import nts.uk.ctx.sys.portal.app.command.standardmenu.UpdateStandardMenuCommand;
import nts.uk.ctx.sys.portal.app.command.standardmenu.UpdateStandardMenuCommandHandler;
import nts.uk.ctx.sys.portal.app.find.standardmenu.StandardMenuDto;
import nts.uk.ctx.sys.portal.app.find.standardmenu.StandardMenuFinder;
import nts.uk.ctx.sys.portal.app.find.standardmenu.StandardMenuQueryDto;
import nts.uk.ctx.sys.portal.app.screenquery.standardmenu.StandardMenuScreenQuery;

/**
 * @author tanlv
 */
@Path("sys/portal/standardmenu")
@Produces("application/json")
public class StandardMenuWebService extends WebService {
	@Inject
	private StandardMenuFinder finder;
	
	@Inject
	private UpdateStandardMenuCommandHandler updateStandardMenu;
	
	@Inject
	private StandardMenuScreenQuery standardMenuScreenQuery;

	@POST
	@Path("findAll")
	public List<StandardMenuDto> findAll() {
		return finder.findAll();
	}

	@POST
	@Path("findByAfterLoginDisplay/{afterLoginDisplay}")
	public List<StandardMenuDto> findByAfterLoginDisplay(@PathParam("afterLoginDisplay") int afterLoginDisplay) {
		return finder.findByAfterLoginDisplay(afterLoginDisplay);
	}

	/**
	 * Find by system menu cls.
	 * ドメインモデル「標準メニュー」を取得する　⇒「標準メニュー（トップページ）」
	 * @return the list
	 */
	@POST
	@Path("findBySystemMenuCls")
	public List<StandardMenuDto> findBySystemMenuCls() {
		return finder.findBySystemMenuCls();
	}
	
	/**
	 * Find data for after login dis.
	 * ドメインモデル「標準メニュー」を取得する　⇒　「標準メニュー（ログイン後）」
	 * @return the list
	 */
	@POST
	@Path("findDataForAfterLoginDis")
	public List<StandardMenuDto> findDataForAfterLoginDis() {
		return finder.findDataForAfterLoginDis();
	}

	@POST
	@Path("findByAtr")
	public List<StandardMenuDto> findByAtr(int webMenuSetting, int menuAtr) {
		return finder.findByAtr(webMenuSetting, menuAtr);
	}
	
	@POST
	@Path("update")
	public void updateStandardMenu(List<StandardMenuCommand>  command) {
		// List<StandardMenuCommand> 
		//UpdateStandardMenuCommand
		UpdateStandardMenuCommand  obj = new UpdateStandardMenuCommand();
		obj.setStandardMenus(command);
		this.updateStandardMenu.handle(obj);
	}

	@POST
	@Path("findAllDisplay")
	public List<StandardMenuDto> findAllDisplay() {
		return finder.findAllDisplay();

	}
	
	@POST
	@Path("findProgramName/{programID}/{screenID}")
	public JavaTypeResult<String> getProgramName(@PathParam("programID") String programID, @PathParam("screenID") String screenID) {
		return new JavaTypeResult<String>(finder.getProgramName(programID, screenID));
	}
	@POST
	@Path("findPgName/{programID}/{screenID}/{queryString}")
	public JavaTypeResult<String> getPgNameByQrystr(@PathParam("programID") String programID, @PathParam("screenID") String screenID, 
			@PathParam("queryString") String queryString) {
		return new JavaTypeResult<String>(finder.getPgNameByQry(programID, screenID, queryString));
	}
	
	@POST
	@Path("findPgName")
	public JavaTypeResult<String> getPgNameByQrystrNullable(StandardMenuQueryDto param) {
		return new JavaTypeResult<String>(finder
				.getPgNameByQry(param.getProgramId(), param.getScreenId(), param.getQueryString()));
	}
	
	@POST
	@Path("findByMenuAndWebMenu")
	public List<StandardMenuDto> findByMenuAndWebMenu() {
		return standardMenuScreenQuery.getStandardMenus();
	}
}
