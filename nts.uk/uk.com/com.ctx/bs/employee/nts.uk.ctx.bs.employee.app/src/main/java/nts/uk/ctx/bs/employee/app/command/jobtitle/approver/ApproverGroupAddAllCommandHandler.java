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
import nts.uk.shr.com.context.AppContexts;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class ApproverGroupAddAllCommandHandler extends CommandHandler<List<ApproverGroupCommand>>{

	@Inject
	private ApproverGroupRepository approverGroupRepository;
	
	@Override
	protected void handle(CommandHandlerContext<List<ApproverGroupCommand>> context) {
		String companyID = AppContexts.user().companyId();
		List<ApproverGroupCommand> commandLst = context.getCommand();
		List<ApproverGroup> approverGroupLst = commandLst.stream().map(x -> x.toDomain()).collect(Collectors.toList());
		
		List<String> codeLst = approverGroupRepository.findAll(companyID).stream().map(x -> x.getApproverGroupCD().v()).collect(Collectors.toList());
		
		approverGroupLst.forEach(x -> {
			if(codeLst.contains(x.getApproverGroupCD().v())) {
				throw new BusinessException("Msg_3");
			}
		});
		
		approverGroupRepository.insertAll(approverGroupLst);
	}
	
	/*
	@AllArgsConstructor
	@Getter
	class ApproverGroupLstCommand {
		private List<ApproverGroupCommand> commandLst;
	}
	*/
}
