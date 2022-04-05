package nts.uk.ctx.sys.portal.app.command.widget;

import java.util.List;

import lombok.Getter;

@Getter
public class AddWidgetCommand {

	private String topPageCode;

	private String topPageName;
	// width size
	private int width;
	// height size
	private int height;

	private List<WidgetDisplayItemCommand> displayItemTypes;
	

}
