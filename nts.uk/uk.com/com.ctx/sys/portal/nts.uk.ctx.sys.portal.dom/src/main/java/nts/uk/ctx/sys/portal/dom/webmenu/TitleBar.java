package nts.uk.ctx.sys.portal.dom.webmenu;

import java.util.List;

import lombok.Value;
import nts.arc.enums.EnumAdaptor;
import nts.gul.text.IdentifierUtil;

@Value
public class TitleBar {

	private String menuBarId;

	private String titleMenuId;

	private TitleBarName titleMenuName;

	private ColorCode backgroundColor;

	private String imageFile;

	private ColorCode textColor;

	private TitleMenuAtr titleMenuAtr;

	private TitleMenuCode titleMenuCode;

	private Integer displayOrder;

	private List<TreeMenu> treeMenu;

	public static TitleBar createFromJavaType(String menuBarId, String titleMenuId, String titleMenuName,
			String backgroundColor, String imageFile, String textColor, int titleMenuAtr, String titleMenuCode,
			Integer displayOrder, List<TreeMenu> treeMenu) {
		return new TitleBar(menuBarId, titleMenuId, new TitleBarName(titleMenuName),
				new ColorCode(backgroundColor), imageFile, new ColorCode(textColor),
				EnumAdaptor.valueOf(titleMenuAtr, TitleMenuAtr.class), new TitleMenuCode(titleMenuCode), displayOrder,
				treeMenu);
	}

	public static TitleBar newTitleMenu(String menuBarId, String titleMenuName, String backgroundColor,
			String imageFile, String textColor, int titleMenuAtr, String titleMenuCode, Integer displayOrder,
			List<TreeMenu> treeMenu) {	
		String titleMenuId = createTitleMenuId();
		return createFromJavaType(menuBarId,titleMenuId,titleMenuName, backgroundColor, imageFile, textColor, titleMenuAtr, titleMenuCode, displayOrder, treeMenu);
	}
	
	public static String createTitleMenuId() {
		return IdentifierUtil.randomUniqueId();
	}
}
