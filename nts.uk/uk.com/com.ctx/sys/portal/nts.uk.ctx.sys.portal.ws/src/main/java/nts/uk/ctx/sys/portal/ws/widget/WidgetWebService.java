package nts.uk.ctx.sys.portal.ws.widget;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.arc.layer.ws.WebService;
import nts.uk.ctx.sys.portal.app.command.widget.UpdateWidgetCommand;
import nts.uk.ctx.sys.portal.app.command.widget.UpdateWidgetCommandHandler;
import nts.uk.ctx.sys.portal.app.find.widget.OptionalWidgetDto;
import nts.uk.ctx.sys.portal.app.find.widget.OptionalWidgetFinder;

@Path("sys/portal/widget")
@Produces("application/json")
public class WidgetWebService extends WebService {

	@Inject
	private UpdateWidgetCommandHandler updateWidgetCommandHandler;

	@Inject
	private OptionalWidgetFinder optionalFinder;

	@POST
	@Path("findAll")
	public List<OptionalWidgetDto> findAll() {
		return this.optionalFinder.findAll();
	}

	@POST
	@Path("update")
	public void update(UpdateWidgetCommand command) {
		this.updateWidgetCommandHandler.handle(command);
	}
}
