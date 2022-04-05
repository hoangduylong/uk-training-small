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
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.CreateFlowMenuRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * UKDesign.UniversalK.共通.CCG_メニュートップページ.CCG034_フローページの作成.A：フローメニューの作成.メニュー別OCD.フローメニュー作成の登録を行う
 */
@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class RegisterFlowMenuCommandHandler extends CommandHandler<RegisterFlowMenuCommand> {

	@Inject
	private CreateFlowMenuRepository createFlowMenuRepository;

	@Override
	protected void handle(CommandHandlerContext<RegisterFlowMenuCommand> context) {
		RegisterFlowMenuCommand command = context.getCommand();
		String cid = AppContexts.user().companyId();
		//1. get(ログイン会社ID、フローメニューコード)
		Optional<CreateFlowMenu> optCreateFlowMenu = createFlowMenuRepository
				.findByPk(cid, command.getFlowMenuCode());
		
		//3. フローメニュー作成　empty
		if (!optCreateFlowMenu.isPresent()) {
			command.setCid(cid);
			
			//4. persist
			createFlowMenuRepository.insert(CreateFlowMenu.createFromMemento(command));
			
		//2. not フローメニュー作成 empty
		} else throw new BusinessException("Msg_3");
	}
}
