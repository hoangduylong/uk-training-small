package nts.uk.ctx.sys.auth.app.command.grant.rolesetperson;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.auth.dom.grant.rolesetperson.RoleSetGrantedPersonRepository;

@Stateless
@Transactional
public class DeleteRoleSetGrantedPersonCommandHandler extends CommandHandler<RoleSetGrantedPersonCommand> {
	@Inject
	private RoleSetGrantedPersonRepository roleSetPersonRepo;

	@Override
	protected void handle(CommandHandlerContext<RoleSetGrantedPersonCommand> context) {
		RoleSetGrantedPersonCommand command = context.getCommand();
		roleSetPersonRepo.delete(command.getEmployeeId());
		
		//dummy code
//		System.out.println("Deleting RoleSetGrantedPerson: EmpId = " + command.getEmployeeId() + " - RoleSetCode = "
//				+ command.getRoleSetCd() + " - period= " + command.getStartDate() + " ~ " + command.getEndDate());
//		System.out.println("Delete done!");
	}
}
