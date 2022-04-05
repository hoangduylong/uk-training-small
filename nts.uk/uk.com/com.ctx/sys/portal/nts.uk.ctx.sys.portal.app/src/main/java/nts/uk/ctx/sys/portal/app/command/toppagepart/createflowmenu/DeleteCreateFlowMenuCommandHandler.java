package nts.uk.ctx.sys.portal.app.command.toppagepart.createflowmenu;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.CreateFlowMenu;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.CreateFlowMenuFileService;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.CreateFlowMenuRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG034_フローページの作成.A：フローメニューの作成.メニュー別OCD.フローメニュー作成の削除を行う
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class DeleteCreateFlowMenuCommandHandler extends CommandHandler<DeleteFlowMenuCommand> {
	
	@Inject
	private CreateFlowMenuRepository createFlowMenuRepository;
	
	@Inject
	private CreateFlowMenuFileService createFlowMenuFileService;

	@Override
	protected void handle(CommandHandlerContext<DeleteFlowMenuCommand> context) {
		DeleteFlowMenuCommand command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		String flowMenuCode = command.getFlowMenuCode();
		// 1. get (ログイン会社ID、フローメニューコード)
		Optional<CreateFlowMenu> optDomain = this.createFlowMenuRepository.findByPk(companyId, flowMenuCode);
		// 2. フローメニュー作成　empty
		if (!optDomain.isPresent()) {
			throw new BusinessException("Msg_1807");
		} 
		// 3. not　フローメニュー作成　empty
		this.createFlowMenuRepository.delete(optDomain.get());
		// 4. 関連するファイルを削除する
		optDomain.get().getFlowMenuLayout().ifPresent(this.createFlowMenuFileService::deleteUploadedFiles);
	}
}
