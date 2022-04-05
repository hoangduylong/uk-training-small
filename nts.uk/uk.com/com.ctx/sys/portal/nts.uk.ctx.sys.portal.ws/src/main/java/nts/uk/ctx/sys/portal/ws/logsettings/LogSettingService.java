package nts.uk.ctx.sys.portal.ws.logsettings;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.portal.app.command.logsettings.LogSettingSaveCommand;
import nts.uk.ctx.sys.portal.app.command.logsettings.LogSettingSaveCommandHandler;
import nts.uk.ctx.sys.portal.app.find.logsettings.LogSettingDto;
import nts.uk.ctx.sys.portal.app.find.logsettings.LogSettingFinder;

@Path("sys/portal/logsettings")
@Produces("application/json")
public class LogSettingService extends WebService {

	@Inject
	private LogSettingFinder logSettingFinder;

	@Inject
	private LogSettingSaveCommandHandler logSettingSaveCommandHandler;

	@POST
	@Path("findBySystem/{systemType}")
	public List<LogSettingDto> findBySystem(@PathParam("systemType") int systemType) {
		return this.logSettingFinder.findBySystem(systemType);
	}

	@POST
	@Path("update")
	public void updateLogSetting(LogSettingSaveCommand command) {
		this.logSettingSaveCommandHandler.handle(command);
	}

}
