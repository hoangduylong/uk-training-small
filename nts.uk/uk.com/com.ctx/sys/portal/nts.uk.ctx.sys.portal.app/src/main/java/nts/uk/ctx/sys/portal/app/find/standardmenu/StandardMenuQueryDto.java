package nts.uk.ctx.sys.portal.app.find.standardmenu;

import lombok.Value;

@Value
public class StandardMenuQueryDto {
	private String programId;
	private String screenId;
	private String queryString;
}
