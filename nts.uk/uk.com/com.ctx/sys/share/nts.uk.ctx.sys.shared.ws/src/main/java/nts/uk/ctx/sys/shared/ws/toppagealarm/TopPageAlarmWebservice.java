package nts.uk.ctx.sys.shared.ws.toppagealarm;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.shared.app.toppagealarm.find.ParamKtg031;
import nts.uk.ctx.sys.shared.app.toppagealarm.find.TopPageAlarmDetailDto;
import nts.uk.ctx.sys.shared.app.toppagealarm.find.TopPageAlarmDetailFinder;
import nts.uk.ctx.sys.shared.app.toppagealarm.find.TopPageAlarmDto;
import nts.uk.ctx.sys.shared.app.toppagealarm.find.TopPageAlarmFinder;
import nts.uk.ctx.sys.shared.app.toppagealarmset.command.TopPageAlarmCommand;
import nts.uk.ctx.sys.shared.app.toppagealarmset.command.UpdateTopPageAlarmCommandHandler;

@Path("sys/share/toppage/alarm")
@Produces("application/json")
public class TopPageAlarmWebservice extends WebService{
	@Inject
	private TopPageAlarmFinder topPageAlarmFinder;
	
	@Inject
	private TopPageAlarmDetailFinder topPageAlarmDetailFinder;
	
	@Inject
	private UpdateTopPageAlarmCommandHandler updateCmd;
	
	@Path("find/toppage/{rogerFlag}/{month}")
	@POST
	public List<TopPageAlarmDto> find(@PathParam("rogerFlag") int rogerFlag, @PathParam("month") int month) {
		return topPageAlarmFinder.findKTG031(rogerFlag, month);
	}
	
	@Path("find/all-toppage/{month}")
	@POST
	public List<TopPageAlarmDto> findAll(@PathParam("month") int month) {
		return topPageAlarmFinder.findAll(month);
	}
	
	@Path("find/detail")
	@POST
	public List<TopPageAlarmDetailDto> findDetail(ParamKtg031 param) {
		return topPageAlarmDetailFinder.findDetail(param);
	}
	
	@Path("update")
	@POST
	public void update(TopPageAlarmCommand cmd) {
		this.updateCmd.handle(cmd);
	}
}
