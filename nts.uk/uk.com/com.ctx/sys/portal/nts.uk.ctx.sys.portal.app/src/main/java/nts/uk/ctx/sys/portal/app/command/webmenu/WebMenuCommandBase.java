package nts.uk.ctx.sys.portal.app.command.webmenu;

import java.util.List;
import java.util.stream.Collectors;

import lombok.Data;
import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.portal.dom.webmenu.MenuBar;
import nts.uk.ctx.sys.portal.dom.webmenu.TitleBar;
import nts.uk.ctx.sys.portal.dom.webmenu.TreeMenu;
import nts.uk.ctx.sys.portal.dom.webmenu.WebMenu;

@NoArgsConstructor
@Data
public class WebMenuCommandBase {
	private String webMenuCode;

	private String webMenuName;

	private int defaultMenu;

	private List<MenuBarCommand> menuBars;
	
	public WebMenu toDomain(String companyId) {
		if (this.menuBars != null) {
			List<MenuBar> menuBars = this.menuBars.stream()
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
			return  WebMenu.createFromJavaType(companyId, this.webMenuCode, this.webMenuName, this.defaultMenu, menuBars);
		}
		
		return  WebMenu.createFromJavaType(companyId, this.webMenuCode, this.webMenuName, this.defaultMenu, null);
	}
}
