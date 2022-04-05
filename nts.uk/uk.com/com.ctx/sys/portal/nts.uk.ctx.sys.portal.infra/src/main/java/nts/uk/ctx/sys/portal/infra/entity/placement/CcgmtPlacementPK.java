package nts.uk.ctx.sys.portal.infra.entity.placement;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * @author LamDT
 */
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class CcgmtPlacementPK implements Serializable {
	
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	/** Company ID */
	@Column(name = "CID")
	public String companyID;

	/** Placement GUID */
	@Column(name = "PLACEMENT_ID")
	public String placementID;

}
