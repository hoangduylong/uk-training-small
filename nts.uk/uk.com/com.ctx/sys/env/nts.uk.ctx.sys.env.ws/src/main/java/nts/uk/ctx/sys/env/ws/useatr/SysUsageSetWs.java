package nts.uk.ctx.sys.env.ws.useatr;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.env.app.command.sysusagesetfinder.AddSysUsageSetCommand;
import nts.uk.ctx.sys.env.app.command.sysusagesetfinder.AddSysUsageSetCommandHandler;
import nts.uk.ctx.sys.env.app.command.sysusagesetfinder.DeleteSysUsageSetCommand;
import nts.uk.ctx.sys.env.app.command.sysusagesetfinder.DeleteSysUsageSetCommandHandler;
import nts.uk.ctx.sys.env.app.command.sysusagesetfinder.UpdateSysUsageSetCommand;
import nts.uk.ctx.sys.env.app.command.sysusagesetfinder.UpdateSysUsageSetCommandHandler;
import nts.uk.ctx.sys.env.app.find.sysusagesetfinder.ParamFinder;
import nts.uk.ctx.sys.env.app.find.sysusagesetfinder.SysUsageSetDto;
import nts.uk.ctx.sys.env.app.find.sysusagesetfinder.SysUsageSetFinder;

@Path("sys/env/usatr")
@Produces("application/json")
public class SysUsageSetWs extends WebService{
	@Inject
	private SysUsageSetFinder finderSys;
	
	@Inject
	private AddSysUsageSetCommandHandler addSys;
	
	@Inject
	private UpdateSysUsageSetCommandHandler updateSys;
	
	@Inject
	private DeleteSysUsageSetCommandHandler deleteSys;
	
	/**
	 * find a sys
	 * @param param
	 * @return
	 */
	@POST
	@Path("findSys")
	public SysUsageSetDto finderSys(ParamFinder param){
		return this.finderSys.finder(param);
	}
	
	/**
	 * update a sys
	 * @param sys
	 */
	@POST
	@Path("updateSys")
	public void update(UpdateSysUsageSetCommand sys){
		this.updateSys.handle(sys);
	}
	
	/**
	 * add a sys
	 * @param sys
	 */
	@POST
	@Path("addSys")
	public void add(AddSysUsageSetCommand sys){
		this.addSys.handle(sys);
	}
	
	/**
	 * delete a sys
	 * @param sys
	 */
	@POST
	@Path("delSys")
	public void delete(DeleteSysUsageSetCommand sys){
		this.deleteSys.handle(sys);
	}
}
