package nts.uk.ctx.bs.employee.app.command.jobtitle.approver;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverGroup;
import nts.uk.ctx.bs.employee.dom.jobtitle.approver.ApproverGroupRepository;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class ApproverGroupAddCommandHandler extends CommandHandler<ApproverGroupCommand>{
	
	@Inject
	private ApproverGroupRepository approverGroupRepository;
	
	@Override
	protected void handle(CommandHandlerContext<ApproverGroupCommand> context) {
		ApproverGroupCommand command = context.getCommand();
		ApproverGroup approverGroup = command.toDomain();
		
		List<String> codeLst = approverGroupRepository.findAll(approverGroup.getCompanyID())
				.stream().map(x -> x.getApproverGroupCD().v()).collect(Collectors.toList());
		
		if(codeLst.contains(approverGroup.getApproverGroupCD().v())) {
			throw new BusinessException("Msg_3");
		}
		
		approverGroupRepository.insert(approverGroup);
	}

}
