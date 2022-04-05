package nts.uk.ctx.sys.portal.app.command.toppagepart.createflowmenu;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.CreateFlowMenu;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.CreateFlowMenuFileService;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.CreateFlowMenuRepository;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.FlowMenuLayout;
import nts.uk.shr.com.context.AppContexts;

/**
 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG034_フローページの作成.D：フローメニューレイアウト設定.メニュー別OCD.フローメニュー作成のレイアウトを登録する
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class UpdateFlowMenuLayoutCommandHandler extends CommandHandler<UpdateFlowMenuLayoutCommand> {
	
	@Inject
	private CreateFlowMenuRepository createFlowMenuRepository;
	
	@Inject
	private CreateFlowMenuFileService createFlowMenuFileService;
	
	@Override
	protected void handle(CommandHandlerContext<UpdateFlowMenuLayoutCommand> context) {
		UpdateFlowMenuLayoutCommand command = context.getCommand();
		//1. get(ログイン会社ID、フローメニューコード)
		Optional<CreateFlowMenu> optCreateFlowMenu = this.createFlowMenuRepository
				.findByPk(AppContexts.user().companyId(), command.getFlowMenuCode());
		
		optCreateFlowMenu.ifPresent(domain -> {
			//2. not　フローメニューレイアウト　empty: delete()
			domain.getFlowMenuLayout().ifPresent(this.createFlowMenuFileService::deleteLayout);
			//4. create(inputフローメニューレイアウト)
			//5. set(ファイルID)
			domain.setFlowMenuLayout(Optional.ofNullable(command.getFlowMenuLayout())
					.map(FlowMenuLayout::createFromMemento));
			//6. set(フローメニューレイアウト)
			//7. persist()
			this.createFlowMenuRepository.update(domain);
		}); 
	}
}
