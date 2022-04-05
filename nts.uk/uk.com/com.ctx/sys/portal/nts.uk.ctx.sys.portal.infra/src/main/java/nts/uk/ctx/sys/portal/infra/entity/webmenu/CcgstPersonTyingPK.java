package nts.uk.ctx.sys.portal.infra.entity.webmenu;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class CcgstPersonTyingPK implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/** Company ID */
	@Column(name = "CID")
	public String companyId;
	
	/** Web menu code */
	@Column(name = "WEB_MENU_CD")
	public String webMenuCode;
	
	@Column(name = "SID")
	public String employeeId;

}
