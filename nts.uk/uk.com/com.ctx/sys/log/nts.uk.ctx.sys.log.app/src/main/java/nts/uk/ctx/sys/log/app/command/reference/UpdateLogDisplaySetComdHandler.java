package nts.uk.ctx.sys.log.app.command.reference;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.log.dom.reference.LogDisplaySettingRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;

@Stateless
@Transactional
public class UpdateLogDisplaySetComdHandler extends CommandHandler<LogDisplaySettingCommand>
{
    @Inject
    private LogDisplaySettingRepository repository;
    
    @Override
    protected void handle(CommandHandlerContext<LogDisplaySettingCommand> context) {
    	LogDisplaySettingCommand updateCommand = context.getCommand();
    	
    	 // get login info
        LoginUserContext loginUserContext = AppContexts.user();
        String cid = loginUserContext .companyId();
        
        repository.update(updateCommand.toDomain(updateCommand.getLogSetId(), cid));
    }
}
