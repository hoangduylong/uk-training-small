package nts.uk.ctx.bs.employee.app.command.groupcommonmaster;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMasterDomainService;
import nts.uk.shr.com.context.AppContexts;

/**
 * 
 * @author sonnlb
 *
 */
@Stateless
public class SaveGroupCommonMasterCommandHandler extends CommandHandler<SaveGroupCommonMasterCommand> {

	@Inject
	private GroupCommonMasterDomainService services;

	@Override
	protected void handle(CommandHandlerContext<SaveGroupCommonMasterCommand> context) {

		SaveGroupCommonMasterCommand command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		String contractCode = AppContexts.user().contractCode();

		// アルゴリズム [使用設定の更新処理] を実行する (Thực hiện thuật toán [Xử lý Cập nhật cài
		// đặt sử dụng] )
		services.updateGroupCommonMasterUsage(contractCode, command.getCommonMasterId(), companyId,
				command.getMasterItemIds());
	}

}
