package nts.uk.ctx.sys.portal.infra.entity.toppagesetting;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * 
 * @author sonnh1
 *
 */
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SPTMT_TOPPAGE_SET")
public class CcgptTopPageSetting extends ContractUkJpaEntity {

	@EmbeddedId
	public CcgptTopPageSettingPK ccgptTopPageSettingPK;

	/** The category setting. */
	@Column(name = "CTG_SET")
	public int ctgSet;

	@Override
	protected CcgptTopPageSettingPK getKey() {
		return this.ccgptTopPageSettingPK;
	}
}
