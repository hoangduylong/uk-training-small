package nts.uk.ctx.sys.portal.infra.entity.standardmenu;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class CcgstStandardMenuPK {
	@Column(name = "CID")
	public String companyId;

	/** The menu code. */
	@Column(name = "CODE")
	public String code;

	/** The system. */
	@Column(name = "SYSTEM")
	public int system;

	/** The classification. */
	@Column(name = "MENU_CLS")
	public int classification;
}
