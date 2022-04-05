package nts.uk.ctx.sys.portal.pub.toppagepart.optionalwidget;

import java.util.Optional;

public interface OptionalWidgetPub {

	/*RequestList365*/
	Optional<OptionalWidgetExport> getSelectedWidget(String companyId, String topPagePartCode);
	
}
