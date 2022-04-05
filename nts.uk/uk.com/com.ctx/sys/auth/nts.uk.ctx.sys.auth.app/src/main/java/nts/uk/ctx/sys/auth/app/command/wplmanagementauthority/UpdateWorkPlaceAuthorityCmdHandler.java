package nts.uk.ctx.sys.auth.app.command.wplmanagementauthority;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthority;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthorityRepository;

@Stateless
public class UpdateWorkPlaceAuthorityCmdHandler extends CommandHandler<UpdateWorkPlaceAuthorityCmd> {
	@Inject
	private WorkPlaceAuthorityRepository repo;
	
	@Override
	protected void handle(CommandHandlerContext<UpdateWorkPlaceAuthorityCmd> context) {
		UpdateWorkPlaceAuthorityCmd appCommand = context.getCommand();
		WorkPlaceAuthority workPlaceAuthority = appCommand.toDomain();
		Optional<WorkPlaceAuthority> checkData = repo.getWorkPlaceAuthorityById(
				workPlaceAuthority.getCompanyId(), workPlaceAuthority.getRoleId(), workPlaceAuthority.getFunctionNo().v());
		if(checkData.isPresent()) {
			repo.updateWorkPlaceAuthority(workPlaceAuthority);
		}
		
		
	}

}
