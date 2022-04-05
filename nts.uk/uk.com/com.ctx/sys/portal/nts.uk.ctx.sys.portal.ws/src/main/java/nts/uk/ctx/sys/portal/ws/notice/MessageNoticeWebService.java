package nts.uk.ctx.sys.portal.ws.notice;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import lombok.Data;
import nts.arc.layer.ws.WebService;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.sys.portal.app.command.notice.DeleteMessageNoticeCommand;
import nts.uk.ctx.sys.portal.app.command.notice.DeleteMessageNoticeCommandHandler;
import nts.uk.ctx.sys.portal.app.command.notice.RegisterMessageNoticeCommand;
import nts.uk.ctx.sys.portal.app.command.notice.RegisterMessageNoticeCommandHandler;
import nts.uk.ctx.sys.portal.app.command.notice.UpdateMessageNoticeCommand;
import nts.uk.ctx.sys.portal.app.command.notice.UpdateMessageNoticeCommandHandler;
import nts.uk.ctx.sys.portal.app.command.notice.ViewMessageNoticeCommand;
import nts.uk.ctx.sys.portal.app.command.notice.ViewMessageNoticeCommandHandler;
import nts.uk.ctx.sys.portal.app.query.notice.DestinationNotificationDto;
import nts.uk.ctx.sys.portal.app.query.notice.EmployeeNotificationDto;
import nts.uk.ctx.sys.portal.app.query.notice.MessageNoticeDto;
import nts.uk.ctx.sys.portal.app.query.notice.MessageNoticeScreenQuery;
import nts.uk.ctx.sys.portal.app.query.notice.NotificationCreated;
import nts.uk.ctx.sys.portal.dom.notice.adapter.DatePeriodDto;
import nts.uk.ctx.sys.portal.dom.notice.adapter.EmployeeInfoImport;
import nts.uk.ctx.sys.portal.dom.notice.adapter.WorkplaceInfoImport;
import nts.uk.shr.com.context.AppContexts;

@Path("sys/portal/notice")
@Produces("application/json")
@Stateless
public class MessageNoticeWebService extends WebService {

	@Inject
	private MessageNoticeScreenQuery screenQuery;

	@Inject
	private RegisterMessageNoticeCommandHandler registerHandler;

	@Inject
	private DeleteMessageNoticeCommandHandler deleteHandler;

	@Inject
	private ViewMessageNoticeCommandHandler viewHandler;

	@Inject
	private UpdateMessageNoticeCommandHandler updateHandler;

	@POST
	@Path("/getEmployeeNotification")
	public EmployeeNotificationDto getEmployeeNotification() {
		GeneralDate sysDate = GeneralDate.today();
		return screenQuery.getEmployeeNotification(new DatePeriod(sysDate, sysDate));
	}

	@POST
	@Path("/notificationCreatedByEmp")
	public NotificationCreated notificationCreatedByEmp(NotificationParams params) {
		String sid = AppContexts.user().employeeId();
		return screenQuery.notificationCreatedByEmp(sid, params.refeRange, params.msg);
	}

	@POST
	@Path("/getNameOfDestinationWkp")
	public List<WorkplaceInfoImport> getNameOfDestinationWkp(List<String> wkIds) {
		return screenQuery.getNameOfDestinationWkp(wkIds);
	}

	@POST
	@Path("/acquireNameOfDestinationEmployee")
	public List<EmployeeInfoImport> acquireNameOfDestinationEmployee(List<String> listSID) {
		return this.screenQuery.acquireNameOfDestinationEmployee(listSID);
	}

	@POST
	@Path("/registerMessageNotice")
	public void registerMessageNotice(RegisterMessageNoticeCommand command) {
		this.registerHandler.handle(command);
	}

	@POST
	@Path("/deleteMessageNotice")
	public void deleteMessageNotice(DeleteMessageNoticeCommand command) {
		this.deleteHandler.handle(command);
	}

	@POST
	@Path("/getContentOfDestinationNotification")
	public DestinationNotificationDto getContentOfDestinationNotification(DatePeriodDto param) {
		DatePeriod period = new DatePeriod(param.getStartDate(), param.getEndDate());
		return this.screenQuery.getContentOfDestinationNotification(period);
	}

	@POST
	@Path("/viewMessageNotice")
	public void viewMessageNotice(ViewMessageNoticeCommand command) {
		this.viewHandler.handle(command);
	}

	@POST
	@Path("/getContentOfNotification")
	public List<MessageNoticeDto> getContentOfNotification(DatePeriodDto param) {
		DatePeriod period = param == null ? new DatePeriod(GeneralDate.today(), GeneralDate.today())
				: new DatePeriod(param.getStartDate(), param.getEndDate());
		return this.screenQuery.getContentOfNotification(period);
	}

	@POST
	@Path("/updateMessageNotice")
	public void updateMessageNotice(UpdateMessageNoticeCommand command) {
		this.updateHandler.handle(command);
	}

	@POST
	@Path("/is-new-notice")
	public boolean isNewNotice() {
		return this.screenQuery.isNewMsg();
	}
}

@Data
class NotificationParams {
	Integer refeRange;
	MessageNoticeDto msg;
}
