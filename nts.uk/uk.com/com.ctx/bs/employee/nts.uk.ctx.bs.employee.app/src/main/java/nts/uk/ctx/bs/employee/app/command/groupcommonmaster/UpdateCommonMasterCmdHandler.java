package nts.uk.ctx.bs.employee.app.command.groupcommonmaster;

import java.util.Arrays;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BundledBusinessException;
import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMaster;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMasterDomainService;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMasterItem;
import nts.uk.shr.com.context.AppContexts;

/**
 * 
 * @author yennth
 *
 */
@Stateless
public class UpdateCommonMasterCmdHandler extends CommandHandler<UpdateCommonMasterCommand> {
	
	@Inject
	private GroupCommonMasterDomainService services;
	
	@Override
	protected void handle(CommandHandlerContext<UpdateCommonMasterCommand> context) {
		
		UpdateCommonMasterCommand command = context.getCommand();
		String contractCode = AppContexts.user().contractCode();
		
		GroupCommonMaster domain = GroupCommonMaster.creatFromJavaType(contractCode,
				command.getMasterSelected().getCommonMasterId(), command.getMasterSelected().getCommonMasterCode(),
				command.getMasterSelected().getCommonMasterName(), command.getMasterSelected().getCommonMasterMemo());
				
				List<GroupCommonMaster> masters	 =  services.getCommonMaster(contractCode);
				
		checkChanged(masters, domain);
		
		// グループ会社共通マスタの更新
		services.updateGroupCommonMaster(contractCode, Arrays.asList(domain));
		
	}
	
	
	private void checkChanged(List<GroupCommonMaster> masters, GroupCommonMaster updateItem) {

		if (masters.isEmpty()) {
			return;
		}

		BundledBusinessException bundleExeption = BundledBusinessException.newInstance();

		GroupCommonMaster oldMaster = masters.stream()
				.filter(x -> x.getCommonMasterId().equals(updateItem.getCommonMasterId())).findFirst().get();

		String itemCode = updateItem.getCommonMasterCode().v();

		boolean isCodeChanged = !itemCode.equals(oldMaster.getCommonMasterCode().v());

		boolean isDuplicateCode = masters.stream().filter(x -> x.getCommonMasterCode().v().equals(itemCode)).findFirst()
				.isPresent();

		if (isCodeChanged && isDuplicateCode) {
			bundleExeption.addMessage(new BusinessException("Msg_3"));
		}

		String itemName = updateItem.getCommonMasterName().v();

		boolean isNameChanged = !itemName.equals(oldMaster.getCommonMasterName().v());

		boolean isDuplicateName = masters.stream().filter(x -> x.getCommonMasterName().v().equals(itemName)).findFirst()
				.isPresent();

		if (isNameChanged && isDuplicateName) {
			bundleExeption.addMessage(new BusinessException("Msg_1603"));
		}

		if (!bundleExeption.getMessageId().isEmpty()) {
			throw bundleExeption;
		}

	}

}
