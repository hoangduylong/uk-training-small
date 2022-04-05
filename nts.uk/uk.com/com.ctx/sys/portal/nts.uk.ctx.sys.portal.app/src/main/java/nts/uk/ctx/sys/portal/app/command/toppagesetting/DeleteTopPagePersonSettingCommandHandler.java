package nts.uk.ctx.sys.portal.app.command.toppagesetting;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSetting;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSettingRepository;

/**
 * The Class DeleteTopPagePersonSettingCommandHandler.
 */
@Stateless
public class DeleteTopPagePersonSettingCommandHandler extends CommandHandler<TopPagePersonSettingCommandBase> {

	/** The repo. */
	@Inject
	private TopPagePersonSettingRepository repo;
	
	/**
	 * Handle.
	 *
	 * @param context the context
	 */
	@Override
	protected void handle(CommandHandlerContext<TopPagePersonSettingCommandBase> context) {
		TopPagePersonSettingCommandBase command = context.getCommand();
		this.repo.delete(TopPagePersonSetting.createFromMemento(command));
	}

}
