package nts.uk.ctx.sys.portal.app.command.webmenu;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class MenuBarCommand {
	
	//private UUID menuBarId;

	private String code;

	private String menuBarName;

	private int selectedAtr;

	private int system;

	private int menuCls;

	private String backgroundColor;

	private String textColor;

	private int displayOrder;

	private List<TitleMenuCommand> titleMenu;

}
