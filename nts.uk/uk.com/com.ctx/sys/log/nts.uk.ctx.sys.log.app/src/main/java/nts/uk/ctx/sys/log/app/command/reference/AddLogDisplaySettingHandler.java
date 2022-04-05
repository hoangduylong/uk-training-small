/**
 * 
 */
package nts.uk.ctx.sys.log.app.command.reference;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandlerContext;
import nts.arc.layer.app.command.CommandHandlerWithResult;
import nts.gul.text.IdentifierUtil;
import nts.uk.ctx.sys.log.dom.reference.LogDisplaySetting;
import nts.uk.ctx.sys.log.dom.reference.LogDisplaySettingRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;

/**
 * @author hiep.th
 *
 */
@Stateless
public class AddLogDisplaySettingHandler extends CommandHandlerWithResult<LogDisplaySettingCommand, String> {
	@Inject
	LogDisplaySettingRepository repo;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.arc.layer.app.command.CommandHandler#handle(nts.arc.layer.app.command
	 * .CommandHandlerContext)
	 */
	@Override
	protected String handle(CommandHandlerContext<LogDisplaySettingCommand> context) {
		LogDisplaySettingCommand manualSetCmd = context.getCommand();
		String logSetId = IdentifierUtil.randomUniqueId();
		
		 // get login info
        LoginUserContext loginUserContext = AppContexts.user();
        String cid = loginUserContext .companyId();
     
        LogDisplaySetting domain = manualSetCmd.toDomain(logSetId, cid);
		repo.add(domain);
		return logSetId;
	}
}
