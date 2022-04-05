package nts.uk.ctx.sys.auth.app.command.wplmanagementauthority;


import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthority;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthorityRepository;

@Stateless
public class CreateWorkPlaceAuthorityCmdHandler extends CommandHandler<CreateWorkPlaceAuthorityCmd> {

	@Inject
	private WorkPlaceAuthorityRepository repo;
	
	@Override
	protected void handle(CommandHandlerContext<CreateWorkPlaceAuthorityCmd> context) {
		
		CreateWorkPlaceAuthorityCmd workPlaceAuthority = context.getCommand();
		WorkPlaceAuthority newWorkPlaceAuthority = workPlaceAuthority.toDomain();
		repo.addWorkPlaceAuthority(newWorkPlaceAuthority);
		
		
	}

}
