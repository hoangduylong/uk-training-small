package nts.uk.ctx.sys.auth.app.command.wkpmanager;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.auth.dom.wkpmanager.WorkplaceManagerRepository;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthorityRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class RemoveWorkplaceManagerCommandHandler extends CommandHandler<RemoveWorkplaceManagerCommand> {

	// Inject repository
	@Inject
	private WorkplaceManagerRepository wkpManagerRepo;
	
	@Inject
	private WorkPlaceAuthorityRepository wkpAuthorityRepo;

	@Override
	protected void handle(CommandHandlerContext<RemoveWorkplaceManagerCommand> context) {
		RemoveWorkplaceManagerCommand command = context.getCommand();
		
		this.wkpManagerRepo.delete(command.getWkpManagerId());
		
		this.wkpAuthorityRepo.deleteWorkPlaceAuthority(AppContexts.user().companyId(), command.getWkpManagerId());
	}
}
