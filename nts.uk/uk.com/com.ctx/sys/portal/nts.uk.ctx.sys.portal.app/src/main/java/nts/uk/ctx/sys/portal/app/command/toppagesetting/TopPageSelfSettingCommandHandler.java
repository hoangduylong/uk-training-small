package nts.uk.ctx.sys.portal.app.command.toppagesetting;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageSelfSet;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageSelfSetRepository;
import nts.uk.shr.com.context.AppContexts;
/**
 * 
 * @author hoatt
 *
 */
@Stateless
@Transactional
public class TopPageSelfSettingCommandHandler extends CommandHandler<TopPageSelfSettingCommand> {

	@Inject
	private TopPageSelfSetRepository repository;
	@Override
	protected void handle(CommandHandlerContext<TopPageSelfSettingCommand> context) {
		//lay employeeId
		String employeeId = AppContexts.user().employeeId();
		TopPageSelfSet topPageNew = TopPageSelfSet.createFromJavaType(employeeId,
										context.getCommand().getCode());
		//Kiem tra trong du lieu trong data
		Optional<TopPageSelfSet> topPage = repository.getTopPageSelfSet(employeeId);
		if(topPage.isPresent()){//da co->update
			repository.updateTopPageSelfSet(topPageNew);
		}else{//chua co->them moi
			repository.addTopPageSelfSet(topPageNew);
		}
	}

}
