package nts.uk.ctx.sys.log.ws.reference;


import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.app.command.JavaTypeResult;
import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.log.app.command.reference.AddLogDisplaySettingHandler;
import nts.uk.ctx.sys.log.app.command.reference.LogDisplaySettingCommand;
import nts.uk.ctx.sys.log.app.command.reference.RemoveLogDisplaySetComdHandler;
import nts.uk.ctx.sys.log.app.command.reference.UpdateLogDisplaySetComdHandler;
import nts.uk.ctx.sys.log.app.find.reference.LogDisplaySettingDto;
import nts.uk.ctx.sys.log.app.find.reference.LogDisplaySettingFinder;
import nts.uk.ctx.sys.log.app.find.reference.record.ParamInputLog;

/*
 * author: thuong.tv
 */

@Path("ctx/sys/log/app")
@Produces("application/json")
public class LogDisplaySettingWebService extends WebService {
	
	@Inject
	private LogDisplaySettingFinder logDisplaySettingFinder;
	
	@Inject
	private AddLogDisplaySettingHandler addLogDisplaySettingHandler;
	
	@Inject
	private UpdateLogDisplaySetComdHandler updateLogDisplaySetComdHandler;
	
	@Inject
	private RemoveLogDisplaySetComdHandler removeLogDisplaySetComdHandler;

	@POST
	@Path("get-log-display-setting-by-code")
	public LogDisplaySettingDto getLogDisplaySettingByCode(String logDisplaySettingCode){
		return this.logDisplaySettingFinder.getLogDisplaySettingByCode(logDisplaySettingCode);
	}
	
	@POST
	@Path("get-log-display-setting-by-code-flag")
	public LogDisplaySettingDto getLogDisplaySettingByCodeAnFlag(String logDisplaySettingCode){
		return this.logDisplaySettingFinder.getLogDisplaySettingByCodeAndFlag(logDisplaySettingCode);
	}
	
	@POST
	@Path("get-all-log-display-set")
	public List<LogDisplaySettingDto> getAllLogDisplaySet(){
		List<LogDisplaySettingDto> logDisplaySetDtos = this.logDisplaySettingFinder.getAllLogDisplaySet();
		return logDisplaySetDtos;
	}
	
	@POST
	@Path("get-log-display-setting-by-record-type")
	public List<LogDisplaySettingDto> getLogDisplaySettingByRecordType(ParamInputLog paramInputLog){
		List<LogDisplaySettingDto> logDisplaySetDtos = this.logDisplaySettingFinder.getLogDisplaySettingByRecordType(paramInputLog.getRecordType(),
				paramInputLog.getTargetDataType());
		return logDisplaySetDtos;
	}
	
	
	@POST
	@Path("add-log-display-set")
	public JavaTypeResult<String> addLogDisplaySetting(LogDisplaySettingCommand command) {
		return new JavaTypeResult<String>(this.addLogDisplaySettingHandler.handle(command));
	}
	
	
	@POST
	@Path("update-log-display-set")
	public void updateLogDisplaySetting(LogDisplaySettingCommand command) {
		this.updateLogDisplaySetComdHandler.handle(command);
	}
	
	@POST
	@Path("delete-log-display-set")
	public void deleteLogDisplaySetting(String logSetId) {
		this.removeLogDisplaySetComdHandler.handle(logSetId);
	}
}
