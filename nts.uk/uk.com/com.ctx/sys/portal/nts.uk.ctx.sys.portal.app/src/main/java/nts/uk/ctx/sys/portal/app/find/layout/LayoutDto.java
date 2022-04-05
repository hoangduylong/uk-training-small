package nts.uk.ctx.sys.portal.app.find.layout;

import java.util.List;

import lombok.Value;
import nts.uk.ctx.sys.portal.app.find.placement.PlacementDto;

/**
 * @author LamDT
 */
@Value
public class LayoutDto {
	
	/** Company ID */
	private String companyID;

	/** Layout GUID */
	private String layoutID;

	/** Enum PG Type */
	private int pgType;
	
	/** List Placement */
	private List<PlacementDto> placements;

}