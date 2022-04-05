package nts.uk.ctx.sys.log.app.command.reference;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.log.dom.reference.LogDisplaySettingRepository;

@Stateless
@Transactional
public class RemoveLogDisplaySetComdHandler extends CommandHandler<String> {

	@Inject
	private LogDisplaySettingRepository repository;

	@Override
	protected void handle(CommandHandlerContext<String> context) {
		String logSetId = context.getCommand();
		repository.remove(logSetId);
	}
}
