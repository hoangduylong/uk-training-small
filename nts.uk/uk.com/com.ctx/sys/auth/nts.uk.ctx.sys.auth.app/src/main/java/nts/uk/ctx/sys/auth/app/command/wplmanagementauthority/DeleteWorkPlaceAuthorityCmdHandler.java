package nts.uk.ctx.sys.auth.app.command.wplmanagementauthority;

import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthority;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthorityRepository;

@Stateless
public class DeleteWorkPlaceAuthorityCmdHandler extends CommandHandler<DeleteWorkPlaceAuthorityCmd>{

	@Inject
	private WorkPlaceAuthorityRepository repo;
	
	@Override
	protected void handle(CommandHandlerContext<DeleteWorkPlaceAuthorityCmd> context) {
		DeleteWorkPlaceAuthorityCmd input = context.getCommand();
		List<WorkPlaceAuthority> checkData = repo.getAllWorkPlaceAuthorityByRoleId(
				input.getCompanyId(), input.getRoleId());
		if(!checkData.isEmpty()) {
			repo.deleteWorkPlaceAuthority(input.getCompanyId(), input.getRoleId());
		}
		
		
		
	}
	
}
