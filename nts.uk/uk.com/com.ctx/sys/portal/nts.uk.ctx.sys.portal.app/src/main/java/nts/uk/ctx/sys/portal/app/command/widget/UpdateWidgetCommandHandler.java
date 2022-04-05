package nts.uk.ctx.sys.portal.app.command.widget;

import javax.ejb.Stateless;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;

/**
 * 
 * @author phongtq
 *
 */
@Stateless
@Transactional
public class UpdateWidgetCommandHandler extends CommandHandler<UpdateWidgetCommand> {


	@Override
	protected void handle(CommandHandlerContext<UpdateWidgetCommand> context) {
		// Do nothing
	}
}