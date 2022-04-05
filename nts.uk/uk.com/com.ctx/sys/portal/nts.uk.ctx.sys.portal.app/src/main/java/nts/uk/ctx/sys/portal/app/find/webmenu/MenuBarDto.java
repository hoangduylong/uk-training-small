package nts.uk.ctx.sys.portal.app.find.webmenu;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MenuBarDto {
	
	private String menuBarId;
	
	private String code;

	private String menuBarName;

	private int selectedAtr;

	private int system;

	private int menuCls;

	private int displayOrder;

	private List<TitleBarDto> titleMenu;


}
