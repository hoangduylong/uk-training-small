package nts.uk.ctx.sys.portal.ws.toppagealarm;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.portal.app.command.toppagealarm.ToppageAlarmDataReadCommand;
import nts.uk.ctx.sys.portal.app.command.toppagealarm.ToppageAlarmDataReadCommandHandler;
import nts.uk.ctx.sys.portal.app.command.toppagealarm.ToppageAlarmDataUnreadCommand;
import nts.uk.ctx.sys.portal.app.command.toppagealarm.ToppageAlarmDataUnreadCommandHandler;
import nts.uk.ctx.sys.portal.app.find.toppagealarm.AlarmDisplayDataDto;
import nts.uk.ctx.sys.portal.app.find.toppagealarm.ToppageAlarmDataFinder;

@Path("sys/portal/toppageAlarm")
@Produces("application/json")
public class ToppageAlarmWs extends WebService {

	@Inject
	private ToppageAlarmDataFinder toppageAlarmDataFinder; 
	
	@Inject
	private ToppageAlarmDataReadCommandHandler toppageAlarmDataReadCommandHandler;
	
	@Inject
	private ToppageAlarmDataUnreadCommandHandler toppageAlarmDataUnreadCommandHandler;
	
	/**
	 * アラームデータを表示する
	 */
	@POST
	@Path("findAlarmData/{displayType}")
	public List<AlarmDisplayDataDto> findAlarmData(@PathParam("displayType") String displayType) {
		return this.toppageAlarmDataFinder.findAlarmData(Integer.parseInt(displayType));
	}
	
	/**
	 * アラームを既読にする
	 */
	@POST
	@Path("changeAlarmToReaded")
	public void changeAlarmToReaded(ToppageAlarmDataReadCommand command) {
		this.toppageAlarmDataReadCommandHandler.handle(command);
	}
	
	/**
	 * アラームを未読にする
	 */
	@POST
	@Path("changeAlarmToUnread")
	public void changeAlarmToUnread(ToppageAlarmDataUnreadCommand command) {
		this.toppageAlarmDataUnreadCommandHandler.handle(command);
	}
	
}
