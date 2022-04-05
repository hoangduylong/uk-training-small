package nts.uk.ctx.sys.portal.app.command.webmenu;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;

import nts.arc.error.BusinessException;
import nts.arc.layer.app.command.CommandHandler;
import nts.arc.layer.app.command.CommandHandlerContext;
import nts.uk.ctx.sys.portal.dom.webmenu.DefaultMenu;
import nts.uk.ctx.sys.portal.dom.webmenu.MenuBar;
import nts.uk.ctx.sys.portal.dom.webmenu.TitleBar;
import nts.uk.ctx.sys.portal.dom.webmenu.TreeMenu;
import nts.uk.ctx.sys.portal.dom.webmenu.WebMenu;
import nts.uk.ctx.sys.portal.dom.webmenu.WebMenuRepository;
import nts.uk.shr.com.context.AppContexts;

@Stateless
@Transactional
public class UpdateWebMenuCommandHander extends CommandHandler<WebMenuCommandBase> {
	
	@Inject
	private WebMenuRepository webMenuRepository;

	@Override
	protected void handle(CommandHandlerContext<WebMenuCommandBase> context) {
		WebMenuCommandBase command = context.getCommand();
		String companyId = AppContexts.user().companyId();
		
		Optional<WebMenu> webMenu = webMenuRepository.find(companyId, command.getWebMenuCode());
		if (!webMenu.isPresent()) {
			throw new RuntimeException("Not found web menu code:" + command.getWebMenuCode());
		}
		
		if (webMenu.get().isDefault() && DefaultMenu.NoDefaultMenu.value == command.getDefaultMenu()) {
			throw new BusinessException("Msg_71");
		}
		
		List<MenuBar> menuBars = command.getMenuBars().stream()
				.map(mn -> { 
					String menuBarId = MenuBar.createMenuBarId();
					
					List<TitleBar> titleMenu = mn.getTitleMenu().stream()
							.map(ti -> {
								String titleMenuId = TitleBar.createTitleMenuId();
								List<TreeMenu> treeMenu = ti.getTreeMenu().stream()
										.map(tr -> {									
											TreeMenu domainTreeMenu = TreeMenu.createFromJavaType(titleMenuId,tr.getCode(), tr.getDisplayOrder(), tr.getClassification(), tr.getSystem());
											return domainTreeMenu;
										}).collect(Collectors.toList());							
								TitleBar domainTitleMenu = TitleBar.createFromJavaType(menuBarId,titleMenuId, ti.getTitleMenuName(), ti.getBackgroundColor(),ti.getImageFile(),ti.getTextColor(),ti.getTitleMenuAtr(),ti.getTitleMenuCode(),ti.getDisplayOrder(), treeMenu);
								return domainTitleMenu;
							}).collect(Collectors.toList());
							
					MenuBar domainMenuBar = MenuBar.createFromJavaType(menuBarId, mn.getMenuBarName(), mn.getSelectedAtr(), mn.getSystem(), mn.getMenuCls(),mn.getCode(), mn.getDisplayOrder(), titleMenu);
					
					return domainMenuBar;				
				}).collect(Collectors.toList());
		
		WebMenu domain =  WebMenu.createFromJavaType(companyId, command.getWebMenuCode(), command.getWebMenuName(), command.getDefaultMenu(), menuBars);
		if (domain.isDefault()) {
			webMenuRepository.changeNotDefault(companyId, command.getWebMenuCode());
		}
		domain.validate();
		
		webMenuRepository.update(domain);
	}

}
