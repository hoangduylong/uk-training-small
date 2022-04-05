package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import java.util.List;

import lombok.Value;
import nts.uk.ctx.sys.portal.app.find.placement.PlacementDto;
@Value
public class LayoutForTopPageDto {
	/** Company ID */
	private String companyID;

	/** Layout GUID */
	private String layoutID;

	/** Enum PG Type */
	private int pgType;
	/**flowMenu*/
	private List<FlowMenuPlusDto> flowMenu;
	/**placement*/
	private List<PlacementDto> placements;
	/**standard menu url*/
	private String standardMenuUrl;
}
