package nts.uk.ctx.sys.portal.app.command.webmenu;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class TitleMenuCommand {

	private String titleMenuName;

	private String backgroundColor;

	private String imageFile;

	private String textColor;

	private int titleMenuAtr;

	private String titleMenuCode;

	private int displayOrder;

	private List<TreeMenuCommand> treeMenu;

}
