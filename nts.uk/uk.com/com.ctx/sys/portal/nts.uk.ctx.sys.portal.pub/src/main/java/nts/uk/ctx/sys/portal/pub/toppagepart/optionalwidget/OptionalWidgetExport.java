package nts.uk.ctx.sys.portal.pub.toppagepart.optionalwidget;

import java.util.List;

import lombok.Getter;

@Getter
public class OptionalWidgetExport {

	private String topPagePartID;

	private String topPageCode;

	private String topPageName;
	
	private int width;
	
	private int height;
	
	private List<WidgetDisplayItemExport> WidgetDisplayItemExport;

	public OptionalWidgetExport(String topPagePartID, String topPageCode, String topPageName, int width, int height,
			List<WidgetDisplayItemExport> widgetDisplayItemExport) {
		super();
		this.topPagePartID = topPagePartID;
		this.topPageCode = topPageCode;
		this.topPageName = topPageName;
		this.width = width;
		this.height = height;
		WidgetDisplayItemExport = widgetDisplayItemExport;
	}
	
	
}
