package nts.uk.ctx.sys.portal.app.command.toppagesetting;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageRoleSetting;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageRoleSettingRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class AddTopPageRoleSettingCommandHandler.
 */
@Stateless
public class AddTopPageRoleSettingCommandHandler extends CommandHandler<TopPageRoleSettingCommandBase>  {

	/** The repo. */
	@Inject
	private TopPageRoleSettingRepository repo;
	
	/**
	 * Handle.
	 *
	 * @param context the context
	 */
	@Override
	protected void handle(CommandHandlerContext<TopPageRoleSettingCommandBase> context) {
		TopPageRoleSettingCommandBase command = context.getCommand();
		this.repo.insert(TopPageRoleSetting.createFromMemento(command), AppContexts.user().companyId(), AppContexts.user().contractCode());
	}

}
