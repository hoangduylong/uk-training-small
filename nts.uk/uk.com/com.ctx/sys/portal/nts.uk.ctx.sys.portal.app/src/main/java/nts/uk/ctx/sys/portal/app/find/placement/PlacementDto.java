package nts.uk.ctx.sys.portal.app.find.placement;

import lombok.Value;

/**
 * @author LamDT
 */
@Value
public class PlacementDto {

	/** Placement GUID */
	private String placementID;

	/** Layout GUID */
	private String layoutID;

	/** Column */
	private int column;
	
	/** Row */
	private int row;
	
	/** Part: TopPagePart & ExternalUrl */
	private PlacementPartDto placementPartDto;

}