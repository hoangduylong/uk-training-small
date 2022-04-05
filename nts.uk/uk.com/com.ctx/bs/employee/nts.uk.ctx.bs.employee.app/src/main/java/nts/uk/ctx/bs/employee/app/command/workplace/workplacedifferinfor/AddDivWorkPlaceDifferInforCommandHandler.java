package nts.uk.ctx.bs.employee.app.command.workplace.workplacedifferinfor;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.operationrule.OperationRule;
import nts.uk.ctx.bs.employee.dom.operationrule.OperationRuleRepository;
/**
 * add DivWorkPlaceDifferInfor Command Handler  
 * @author yennth
 */
@Stateless
public class AddDivWorkPlaceDifferInforCommandHandler extends CommandHandler<AddDivWorkPlaceDifferInforCommand>{
	@Inject
	private OperationRuleRepository operationRuleRep;
	// add a item
	@Override
	protected void handle(CommandHandlerContext<AddDivWorkPlaceDifferInforCommand> context) {
		AddDivWorkPlaceDifferInforCommand data = context.getCommand();
		Optional<OperationRule> div = operationRuleRep.findOperationRule(data.getCompanyId());
		// if existed in Data base
		if(div.isPresent()){
			throw new BusinessException("Msg_3");
		}
		OperationRule divNew = new OperationRule( data.getCompanyId(), data.getRegWorkDiv());
		divNew.validate();
		operationRuleRep.insert(divNew);
	}
}
