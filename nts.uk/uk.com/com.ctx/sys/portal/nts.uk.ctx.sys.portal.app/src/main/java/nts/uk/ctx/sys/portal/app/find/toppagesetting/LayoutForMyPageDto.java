package nts.uk.ctx.sys.portal.app.find.toppagesetting;

import java.util.List;

import lombok.Value;
import nts.uk.ctx.sys.portal.app.find.placement.PlacementDto;

@Value
public class LayoutForMyPageDto {

	/** Employee ID */
	private String employeeID;

	/** Layout GUID */
	private String layoutID;

	/** Enum PG Type */
	private int pgType;
	
	/**
	 * true - active top page
	 * false - active my page
	 */
	private boolean notActiveMyPage;
	
	/**flowMenu*/
	private List<FlowMenuPlusDto> flowMenu;
	/**placement*/
	private List<PlacementDto> placements;
}
