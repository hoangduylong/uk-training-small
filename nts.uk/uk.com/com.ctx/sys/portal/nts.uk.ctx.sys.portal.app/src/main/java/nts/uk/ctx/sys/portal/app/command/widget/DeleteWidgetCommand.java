package nts.uk.ctx.sys.portal.app.command.widget;

import java.util.List;

import lombok.Value;

@Value
public class DeleteWidgetCommand {
	// top page code
	private String topPagePartID;

	private List<WidgetDisplayItemCommand> displayItemTypes;
}
