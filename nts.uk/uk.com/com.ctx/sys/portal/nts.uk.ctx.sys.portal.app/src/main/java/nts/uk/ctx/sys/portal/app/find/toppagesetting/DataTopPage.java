package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import lombok.Builder;
import lombok.Data;
import nts.uk.ctx.sys.portal.app.find.standardmenu.StandardMenuDto;

@Data
@Builder
public class DataTopPage {
	// data display top page
	private DisplayInTopPage displayTopPage;
	private Integer menuClassification;
	private StandardMenuDto standardMenu;
}
