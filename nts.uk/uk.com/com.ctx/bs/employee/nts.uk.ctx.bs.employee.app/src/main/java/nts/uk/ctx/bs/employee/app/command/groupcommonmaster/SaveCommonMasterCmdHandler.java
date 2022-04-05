package nts.uk.ctx.bs.employee.app.command.groupcommonmaster;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BundledBusinessException;
import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.CommonMasterItemCode;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.CommonMasterItemName;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMasterDomainService;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMasterItem;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class SaveCommonMasterCmdHandler extends CommandHandler<SaveCommonMasterCommand> {

	@Inject
	private GroupCommonMasterDomainService services;

	@Override
	protected void handle(CommandHandlerContext<SaveCommonMasterCommand> context) {
		// 画面情報を取得する(Get thông tin màn hình)

		SaveCommonMasterCommand cmd = context.getCommand();
		UpdateMasterItemCommand updateItem = cmd.getSelectedCommonMasterItem();

		String contractCd = AppContexts.user().contractCode();

		List<GroupCommonMasterItem> domains = new ArrayList<GroupCommonMasterItem>();

		String commonMasterId = cmd.getSelectedCommonMaster().getCommonMasterId();

		String CommonMasterItemId = updateItem.getCommonMasterItemId() != null ? updateItem.getCommonMasterItemId()
				: null;
		//・ List <Add common master item>. Display order = MAX (List <common master item>. displayNumber) ++ 1
		int displayNumber = updateItem.getDisplayNumber() != null ? updateItem.getDisplayNumber()
				: genDisplayNumber(cmd.getCommonMasterItems()) ;

		// vì add và update đều tạo domain nên viết chung cho gọn
		domains.add(new GroupCommonMasterItem(CommonMasterItemId,
				new CommonMasterItemCode(updateItem.getCommonMasterItemCode()),
				new CommonMasterItemName(updateItem.getCommonMasterItemName()), displayNumber,
				updateItem.getUsageStartDate(), updateItem.getUsageEndDate()));
		
		List<GroupCommonMasterItem> items = services.getGroupCommonMasterItem(contractCd, commonMasterId);

		if (cmd.isNewMode()) {
		
				checkAddNew(items, domains.get(0));
			
			// 画面モード = 新規モード (Screen mode = New mode)
			this.services.addCommonMasterItem(contractCd, commonMasterId, domains);
		} else {
			
			if (!items.isEmpty()) {
				checkChanged(CommonMasterItemId, items, domains.get(0));
			}
			// bước kiểm tra data đã thay đổi chưa được làm ở dưới client
			// 画面モード = 更新モード (Screen mode = Update mode)
			this.services.updateCommonMasterItem(contractCd, commonMasterId, domains);
		}
		// phần get data để trả về làm dưới client
	}

	private Integer genDisplayNumber(List<UpdateMasterItemCommand> commonMasterItems) {

		if (commonMasterItems.isEmpty()) {
			return 1;
		}

		return Collections.max(commonMasterItems, Comparator.comparing(UpdateMasterItemCommand::getDisplayNumber))
				.getDisplayNumber() + 1;
	}

	private void checkAddNew(List<GroupCommonMasterItem> items, GroupCommonMasterItem updateItem) {
		
		if (items.isEmpty()) {
			return;
		}
		BundledBusinessException bundleExeption = BundledBusinessException.newInstance();

		String itemCode = updateItem.getCommonMasterItemCode().v();

		boolean isDuplicateCode = items.stream().filter(x -> x.getCommonMasterItemCode().v().equals(itemCode))
				.findFirst().isPresent();

		if (isDuplicateCode) {
			bundleExeption.addMessage(new BusinessException("Msg_3"));
		}

		String itemName = updateItem.getCommonMasterItemName().v();

		boolean isDuplicateName = items.stream().filter(x -> x.getCommonMasterItemName().v().equals(itemName))
				.findFirst().isPresent();

		if (isDuplicateName) {
			bundleExeption.addMessage(new BusinessException("Msg_1603"));
		}

		if (!bundleExeption.getMessageId().isEmpty()) {
			throw bundleExeption;
		}
	}

	private void checkChanged(String commonMasterItemId, List<GroupCommonMasterItem> items,
			GroupCommonMasterItem updateItem) {

		if (items.isEmpty()) {
			return;
		}
	
		BundledBusinessException bundleExeption = BundledBusinessException.newInstance();
		
		GroupCommonMasterItem oldItem = items.stream().filter(x -> x.getCommonMasterItemId().equals(commonMasterItemId))
				.findFirst().get();

		String itemCode = updateItem.getCommonMasterItemCode().v();

		boolean isCodeChanged = !itemCode.equals(oldItem.getCommonMasterItemCode().v());

		boolean isDuplicateCode = items.stream().filter(x -> x.getCommonMasterItemCode().v().equals(itemCode))
				.findFirst().isPresent();

		if (isCodeChanged && isDuplicateCode) {
			bundleExeption.addMessage(new BusinessException("Msg_3"));
		}

		String itemName = updateItem.getCommonMasterItemName().v();

		boolean isNameChanged = !itemName.equals(oldItem.getCommonMasterItemName().v());

		boolean isDuplicateName = items.stream().filter(x -> x.getCommonMasterItemName().v().equals(itemName))
				.findFirst().isPresent();

		if (isNameChanged && isDuplicateName) {
			bundleExeption.addMessage(new BusinessException("Msg_1603"));
		}

		if (!bundleExeption.getMessageId().isEmpty()) {
			throw bundleExeption;
		}

	}

}