package nts.uk.ctx.bs.employee.app.command.jobtitle.approver;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverGroup;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverGroupRepository;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class ApproverGroupDelCommandHandler extends CommandHandler<ApproverGroupCommand>{

	@Inject
	private ApproverGroupRepository approverGroupRepository;
	
	@Override
	protected void handle(CommandHandlerContext<ApproverGroupCommand> context) {
		ApproverGroupCommand command = context.getCommand();
		ApproverGroup approverGroup = command.toDomain();
		
		approverGroupRepository.delete(approverGroup);
	}

}
