package nts.uk.ctx.sys.portal.infra.entity.permissionsettingmenu;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SPTMT_PER_SETTING_MENU")
public class SptmtPerSettingMenu extends ContractUkJpaEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public SptmtPerSettingMenuPK sptmtPerSettingMenuPK;
	
	@Column(name = "ROLE_TYPE")
	public int roleType;

	@Override
	protected SptmtPerSettingMenuPK getKey() {
		return this.sptmtPerSettingMenuPK;
	}
}
