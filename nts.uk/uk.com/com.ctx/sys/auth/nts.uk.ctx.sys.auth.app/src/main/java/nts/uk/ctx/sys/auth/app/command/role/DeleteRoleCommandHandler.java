package nts.uk.ctx.sys.auth.app.command.role;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.auth.dom.role.Role;
import nts.uk.ctx.sys.auth.dom.role.RoleRepository;

@Stateless
public class DeleteRoleCommandHandler extends CommandHandler<DeleteRoleCommand> {

	@Inject
	private RoleRepository repo;
	
	@Override
	protected void handle(CommandHandlerContext<DeleteRoleCommand> context) {
		String roleId = context.getCommand().getRoleId();
		Optional<Role> checkData = repo.findByRoleId(roleId);
		if(checkData.isPresent()) {
			repo.remove(roleId);
		} else {
			throw new BusinessException("K co du lieu de xoa");
		}
		
	}

}
