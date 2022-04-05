package nts.uk.ctx.sys.portal.dom.webmenu;

import java.util.List;

import lombok.Value;
import nts.arc.enums.EnumAdaptor;
import nts.gul.text.IdentifierUtil;
import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.enums.System;
/**
 * 
 * @author sonnh
 *
 */

@Value
public class MenuBar {
	
	private String menuBarId;
	
	private MenuCode code;
	
	private MenuBarName menuBarName;
		
	private SelectedAtr selectedAtr;
	
	private System system;

	private MenuClassification menuCls;
	
	private Integer displayOrder;

	private List<TitleBar> titleMenu;
	
	public static MenuBar createFromJavaType(String menuBarId, String menuBarName, int selectedAtr,
			int system, int menuCls, String code, Integer displayOrder, List<TitleBar> titleMenu) {
		return new MenuBar(
				menuBarId,
				new MenuCode(code),
				new MenuBarName(menuBarName),
				EnumAdaptor.valueOf(selectedAtr, SelectedAtr.class),
				EnumAdaptor.valueOf(system, System.class),
				EnumAdaptor.valueOf(menuCls, MenuClassification.class),
				displayOrder,
				titleMenu);
	}
	
	public static String createMenuBarId() {
		return IdentifierUtil.randomUniqueId();
	}
	
	
}
