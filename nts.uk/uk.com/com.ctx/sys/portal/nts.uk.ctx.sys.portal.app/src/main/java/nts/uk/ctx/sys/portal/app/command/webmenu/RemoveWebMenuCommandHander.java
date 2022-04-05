package nts.uk.ctx.sys.portal.app.command.webmenu;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.webmenu.WebMenu;
import nts.uk.ctx.sys.portal.dom.webmenu.WebMenuRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
@Transactional
public class RemoveWebMenuCommandHander extends CommandHandler<RemoveWebMenuCommand> {
	
	@Inject
	private WebMenuRepository webMenuRepository;

	@Override
	protected void handle(CommandHandlerContext<RemoveWebMenuCommand> context) {
		
		RemoveWebMenuCommand command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		
		Optional<WebMenu> webMenu = webMenuRepository.find(companyId, command.getWebMenuCd());
		if (!webMenu.isPresent()) {
			throw new RuntimeException("Not found web menu code:" + command.getWebMenuCd());
		}
		
		if (webMenu.get().isDefault()) {
			throw new BusinessException("Msg_72");
		}
		
		webMenuRepository.remove(companyId, command.getWebMenuCd());

	}
	

}
