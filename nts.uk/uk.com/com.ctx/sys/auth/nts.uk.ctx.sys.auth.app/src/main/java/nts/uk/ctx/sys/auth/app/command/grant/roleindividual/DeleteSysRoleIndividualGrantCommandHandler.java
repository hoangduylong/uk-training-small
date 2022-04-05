package nts.uk.ctx.sys.auth.app.command.grant.roleindividual;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.enums.EnumAdaptor;
import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrantRepository;
import nts.uk.ctx.sys.auth.dom.grant.service.RoleIndividualService;
import nts.uk.ctx.sys.auth.dom.role.RoleType;
import nts.arc.time.calendar.period.DatePeriod;

@Stateless
@Transactional
public class DeleteSysRoleIndividualGrantCommandHandler extends CommandHandler<DeleteRoleIndividualGrantCommand> {

	@Inject
	private RoleIndividualService roleIndividualService;

	@Inject
	private RoleIndividualGrantRepository roleIndividualGrantRepo;

	@Override
	protected void handle(CommandHandlerContext<DeleteRoleIndividualGrantCommand> context) {
		DeleteRoleIndividualGrantCommand command = context.getCommand();

		RoleType roleType = EnumAdaptor.valueOf(command.getRoleType(), RoleType.class);
		
		if (roleType == RoleType.SYSTEM_MANAGER) {
			DatePeriod insertPeriod = new DatePeriod(command.getStartValidPeriod(), command.getEndValidPeriod());
			boolean isValid = roleIndividualService.checkSysAdmin(command.getUserID(), insertPeriod);
			if (isValid == false)
				throw new BusinessException("Msg_331");
		}

		roleIndividualGrantRepo.remove(command.getUserID(), command.getCompanyID(), roleType.value);
	}

}
