package nts.uk.ctx.sys.portal.dom.notice.adapter;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WorkplaceInfoImport {
	
	/** The workplace id. */
	private String workplaceId;

	/** The workplace code. */
	private String workplaceCode;

	/** The workplace name. */
	private String workplaceName;
}
