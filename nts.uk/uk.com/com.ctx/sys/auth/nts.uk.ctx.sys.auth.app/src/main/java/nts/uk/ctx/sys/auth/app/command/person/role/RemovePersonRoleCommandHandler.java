package nts.uk.ctx.sys.auth.app.command.person.role;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.auth.dom.role.RoleAtr;
import nts.uk.ctx.sys.auth.dom.role.RoleService;
import nts.uk.ctx.sys.auth.dom.role.personrole.PersonRoleRepository;
import nts.uk.ctx.sys.auth.dom.roleset.RoleSet;
import nts.uk.ctx.sys.auth.dom.roleset.RoleSetRepository;
import nts.uk.ctx.sys.auth.dom.roleset.service.RoleSetService;
import nts.uk.shr.com.context.AppContexts;

@Stateless
@Transactional
public class RemovePersonRoleCommandHandler extends CommandHandler<RemovePersonRoleCommand> {
	@Inject
	private RoleService roleService;	
	@Inject
	private PersonRoleRepository personRoleRepo;
	@Inject 
	private RoleSetRepository roleSetRepo;
	@Inject
	private RoleSetService roleSetService;

	@Override
	protected void handle(CommandHandlerContext<RemovePersonRoleCommand> context) {
		final RemovePersonRoleCommand command = context.getCommand();		
		
		roleService.removeRole(command.getRoleId());
		personRoleRepo.remove(command.getRoleId());
		if(command.getAssignAtr()==RoleAtr.GENERAL.value){
			List<RoleSet> roleSets = roleSetRepo.findByCompanyIdAndPersonRole(AppContexts.user().companyId(), command.getRoleId());
			if(!roleSets.isEmpty()){
				roleSets.forEach(rs ->{
					rs.removePersonInfRole();
					roleSetService.updateRoleSet(rs);
				});

			}
		}
	}

}
