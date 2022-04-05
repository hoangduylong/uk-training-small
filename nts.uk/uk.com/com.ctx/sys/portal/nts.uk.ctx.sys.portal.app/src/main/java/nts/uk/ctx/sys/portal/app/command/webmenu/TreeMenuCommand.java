package nts.uk.ctx.sys.portal.app.command.webmenu;


import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class TreeMenuCommand {

	//private UUID titleMenuId;

	private String code;
	
	private int displayOrder;
	
	private int classification;
	
	private int system;

}
