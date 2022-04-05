package nts.uk.ctx.sys.gateway.ws.stopsetting;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import lombok.val;
import nts.arc.layer.app.command.JavaTypeResult;
import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.gateway.app.command.stopsetting.SaveStopSettingCommand;
import nts.uk.ctx.sys.gateway.app.command.stopsetting.SaveStopSettingCommandHandler;
import nts.uk.ctx.sys.gateway.app.find.stopsetting.StopSettingDto;
import nts.uk.ctx.sys.gateway.app.find.stopsetting.StopSettingFinder;

@Path("ctx/sys/gateway/stopsetting")
@Produces("application/json")
@Stateless
public class StopSettingWebService extends WebService {

	@Inject
	private StopSettingFinder finder;
	@Inject
	private SaveStopSettingCommandHandler saveHandler;

	@POST
	@Path("find/{isSystem}")
	public StopSettingDto find(@PathParam("isSystem") int isSystem) {
		val stopSettingDto = this.finder.find(isSystem);
		return stopSettingDto;
	}

	@POST
	@Path("save")
	public void save(SaveStopSettingCommand command) {
		this.saveHandler.handle(command);
	}
	
	@POST
	@Path("isSystemStop")
	public JavaTypeResult<Boolean> isSystemStop() {
		return new JavaTypeResult<Boolean>(this.finder.isSystemStop());
	}

}
