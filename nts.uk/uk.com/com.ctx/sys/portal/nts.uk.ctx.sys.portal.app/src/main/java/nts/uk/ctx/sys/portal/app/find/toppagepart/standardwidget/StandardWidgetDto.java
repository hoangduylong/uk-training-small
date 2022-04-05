package nts.uk.ctx.sys.portal.app.find.toppagepart.standardwidget;

import lombok.Value;
import nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget.StandardWidget;
/**
 * @author hieult
 */
@Value
public class StandardWidgetDto {
	
	private String companyID;
	
	private String toppagePartID;

	private String toppagePartCode;
	
	private String toppagePartName; 
	
	private int type;
	
	private int width;
	
	private int height;
	
	public static StandardWidgetDto fromDomain(StandardWidget domain) {
		return new StandardWidgetDto(
			domain.getCompanyID(),
			"",
			"",
			"",
			0,
			0,
			0
			);
	}

}
