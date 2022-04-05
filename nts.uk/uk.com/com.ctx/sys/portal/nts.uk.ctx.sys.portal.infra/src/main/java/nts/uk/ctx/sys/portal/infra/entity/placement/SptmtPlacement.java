package nts.uk.ctx.sys.portal.infra.entity.placement;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * @author LamDT
 */
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SPTMT_PLACEMENT")
public class SptmtPlacement extends ContractUkJpaEntity {

	@EmbeddedId
	public CcgmtPlacementPK ccgmtPlacementPK;

	@Column(name = "LAYOUT_ID")
	public String layoutID;

	@Column(name = "POS_COLUMN")
	public int column;

	@Column(name = "POS_ROW")
	public int row;

	@Column(name = "SIZE_WIDTH")
	public Integer width;

	@Column(name = "SIZE_HEIGHT")
	public Integer height;

	@Column(name = "EXTERNAL_URL")
	public String externalUrl;

	@Column(name = "TOPPAGE_PART_ID")
	public String topPagePartID;

	@Override
	protected Object getKey() {
		return ccgmtPlacementPK;
	}

}
