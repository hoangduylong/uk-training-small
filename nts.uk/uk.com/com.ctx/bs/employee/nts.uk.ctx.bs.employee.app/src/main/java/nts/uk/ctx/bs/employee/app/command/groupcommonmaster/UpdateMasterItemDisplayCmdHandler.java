package nts.uk.ctx.bs.employee.app.command.groupcommonmaster;

import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMasterDomainService;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMasterItem;
import nts.uk.shr.com.context.AppContexts;
/**
 * 表示順を更新する
 * @author yennth
 *
 */
@Stateless
public class UpdateMasterItemDisplayCmdHandler extends CommandHandler<UpdateMasterItemDisplayCommand>{
	@Inject	
	private GroupCommonMasterDomainService services;

	@Override
	protected void handle(CommandHandlerContext<UpdateMasterItemDisplayCommand> context) {
		UpdateMasterItemDisplayCommand command = context.getCommand();
		String contractCode = AppContexts.user().contractCode();
		
		// グループ会社共通マスタ項目の更新
		if(!command.getListMasterItem().isEmpty()) {
			services.updateCommonMasterItem(contractCode, command.getCommonMasterId(), 
					command.getListMasterItem().stream()
												.map(x -> GroupCommonMasterItem.creatFromJavaType(x.getCommonMasterItemId(), x.getCommonMasterItemCode(), 
																									x.getCommonMasterItemName(), x.getDisplayNumber(), 
																									x.getUsageStartDate(),
																									x.getUsageEndDate()))
												.collect(Collectors.toList()));			
		}

	}
}
