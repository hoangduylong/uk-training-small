package nts.uk.ctx.sys.portal.app.find.toppagepart.standardwidget;

import javax.ejb.Stateless;

import nts.uk.ctx.sys.portal.dom.toppagepart.standardwidget.StandardWidget;
import nts.uk.shr.com.context.AppContexts;
@Stateless
public class StandardWidgetFinder {

	public StandardWidgetDto getStanddardWidget(String toppagePartID) {
		String companyID = AppContexts.user().companyId();
		StandardWidget widget = new StandardWidget(companyID);
		return StandardWidgetDto.fromDomain(widget);
	}
}
