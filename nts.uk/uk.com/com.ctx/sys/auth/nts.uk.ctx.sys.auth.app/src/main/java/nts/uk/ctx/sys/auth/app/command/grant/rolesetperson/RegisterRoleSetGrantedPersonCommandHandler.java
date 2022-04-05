package nts.uk.ctx.sys.auth.app.command.grant.rolesetperson;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.auth.dom.grant.rolesetperson.RoleSetGrantedPerson;
import nts.uk.ctx.sys.auth.dom.grant.rolesetperson.RoleSetGrantedPersonRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
@Transactional
public class RegisterRoleSetGrantedPersonCommandHandler extends CommandHandler<RoleSetGrantedPersonCommand> {
	@Inject
	private RoleSetGrantedPersonRepository roleSetPersonRepo;

	@Override
	protected void handle(CommandHandlerContext<RoleSetGrantedPersonCommand> context) {
		RoleSetGrantedPersonCommand command = context.getCommand();
		if (command.getEmployeeId() == null || command.getEmployeeId().isEmpty())
			throw new BusinessException("Msg_218", "Com_Person");
		String companyId = AppContexts.user().companyId();
		if (command.getMode() == 0) {
			if (roleSetPersonRepo.getByEmployeeId(command.getEmployeeId()).isPresent()) {
				throw new BusinessException("Msg_716", "CAS014_26");
			}
			roleSetPersonRepo.insert(new RoleSetGrantedPerson(command.getRoleSetCd(), companyId, command.getStartDate(),
					command.getEndDate(), command.getEmployeeId()));
		} else {
			roleSetPersonRepo.update(new RoleSetGrantedPerson(command.getRoleSetCd(), companyId, command.getStartDate(),
					command.getEndDate(), command.getEmployeeId()));
		}
	}
}
