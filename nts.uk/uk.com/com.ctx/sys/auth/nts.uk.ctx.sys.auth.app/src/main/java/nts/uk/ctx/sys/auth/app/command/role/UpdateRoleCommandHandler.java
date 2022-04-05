package nts.uk.ctx.sys.auth.app.command.role;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.auth.dom.role.Role;
import nts.uk.ctx.sys.auth.dom.role.RoleRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class UpdateRoleCommandHandler extends CommandHandler<UpdateRoleCommand> {

	@Inject
	private RoleRepository repo;
	
	@Override
	protected void handle(CommandHandlerContext<UpdateRoleCommand> context) {
		
		UpdateRoleCommand role = context.getCommand();
		role.setCompanyId(AppContexts.user().companyId());
		role.setContractCode(AppContexts.user().contractCode());
		Role newRole = role.toDomain();
		Optional<Role> checkData = repo.findByRoleId(newRole.getRoleId());
		if(checkData.isPresent()) {
			repo.update(newRole);
		} else {
			throw new BusinessException("K ton tai");
		}
	}

}
