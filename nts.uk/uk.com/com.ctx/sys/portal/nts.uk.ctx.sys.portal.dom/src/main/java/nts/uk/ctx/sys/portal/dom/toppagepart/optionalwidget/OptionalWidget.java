package nts.uk.ctx.sys.portal.dom.toppagepart.optionalwidget;

import java.util.List;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * 選択ウィジェット
 * 
 * @author phongtq
 *
 */
@Getter
public class OptionalWidget extends AggregateRoot {
	
	private String companyID;

	private List<WidgetDisplayItem> wDisplayItems;

	public OptionalWidget(String companyID, List<WidgetDisplayItem> wDisplayItems) {
		this.companyID = companyID;
		this.wDisplayItems = wDisplayItems;
	}

}
