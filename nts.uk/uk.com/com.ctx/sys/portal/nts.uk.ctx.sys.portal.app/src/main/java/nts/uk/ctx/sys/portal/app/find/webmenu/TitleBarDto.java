package nts.uk.ctx.sys.portal.app.find.webmenu;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TitleBarDto {
	
	private String titleMenuId;
	
	private String titleMenuName;

	private String backgroundColor;

	private String imageFile;

	private String textColor;

	private int titleMenuAtr;

	private String titleMenuCode;

	private int displayOrder;

	private List<TreeMenuDto> treeMenu;

}
