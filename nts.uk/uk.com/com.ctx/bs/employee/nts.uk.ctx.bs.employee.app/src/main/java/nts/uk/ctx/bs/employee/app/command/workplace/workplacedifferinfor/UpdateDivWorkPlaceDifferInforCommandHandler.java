package nts.uk.ctx.bs.employee.app.command.workplace.workplacedifferinfor;

import javax.ejb.Stateless;
/**
 * update a item
 * @author yennth
 *
 */
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.operationrule.OperationRule;
import nts.uk.ctx.bs.employee.dom.operationrule.OperationRuleRepository;
/**
 * update DivWorkPlaceDifferInfor Command Handler
 * @author yennth
 */
@Stateless
public class UpdateDivWorkPlaceDifferInforCommandHandler extends CommandHandler<UpdateDivWorkPlaceDifferInforCommand>{
	@Inject
	private OperationRuleRepository operationRuleRep;

	// update a item
	@Override
	protected void handle(CommandHandlerContext<UpdateDivWorkPlaceDifferInforCommand> context) {
		UpdateDivWorkPlaceDifferInforCommand data = context.getCommand();
		OperationRule operationRule = new OperationRule( data.getCompanyId(), data.getRegWorkDiv());
		operationRuleRep.update(operationRule);
	}
	
}
