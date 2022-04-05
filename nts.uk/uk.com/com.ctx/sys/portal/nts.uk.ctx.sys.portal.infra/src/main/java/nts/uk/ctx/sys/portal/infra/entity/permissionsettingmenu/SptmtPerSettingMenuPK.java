package nts.uk.ctx.sys.portal.infra.entity.permissionsettingmenu;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class SptmtPerSettingMenuPK {
	
	/** The menu code. */
	@Column(name = "MENU_CODE")
	public String menuCode;
	
	/** The system. */
	@Column(name = "SYSTEM")
	public int system;
	
	/** The classification. */
	@Column(name = "MENU_CLS")
	public int classification;
}
