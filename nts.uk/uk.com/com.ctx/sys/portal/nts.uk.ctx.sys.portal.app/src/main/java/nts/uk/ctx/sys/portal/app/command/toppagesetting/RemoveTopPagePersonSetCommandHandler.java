package nts.uk.ctx.sys.portal.app.command.toppagesetting;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSetRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * Remove data from table TOPPAGE_PERSON_SET by companyId and employee Id
 * 
 * @author sonnh1
 *
 */
@Stateless
@Transactional
public class RemoveTopPagePersonSetCommandHandler extends CommandHandler<TopPagePersonSetCommandBase> {

	@Inject
	private TopPagePersonSetRepository topPagePersonSetRepo;

	@Override
	protected void handle(CommandHandlerContext<TopPagePersonSetCommandBase> context) {
		String companyId = AppContexts.user().companyId();
		TopPagePersonSetCommandBase command = context.getCommand();
		topPagePersonSetRepo.remove(companyId, command.getSId());
	}
}
