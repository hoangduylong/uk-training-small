package nts.uk.ctx.sys.portal.app.command.placement;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.sys.portal.dom.placement.Placement;
import nts.uk.shr.com.context.AppContexts;

/**
 * @author LamDT
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PortalPlacementCommand {

	/** Placement GUID */
	private String placementID;
	
	/** Layout GUID */
	private String layoutID;

	/** Column */
	private int column;

	/** Row */
	private int row;

	/** Width */
	private Integer width;

	/** Height */
	private Integer height;

	/** Url */
	private String url;

	/** TopPage Part GUID */
	private String topPagePartID;

	/** Convert to Domain */
	public Placement toDomain() {
		return toDomain(this.placementID);
	}

	/** Convert to Domain with given ID */
	public Placement toDomain(String placementID) {
		String companyID = AppContexts.user().companyId();
		return Placement.createFromJavaType(
			companyID, placementID, layoutID, topPagePartID,
			column, row, url, width, height);
	}
	
}