package nts.uk.ctx.sys.portal.infra.entity.webmenu.smartphonemenu;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * 
 * @author sonnh1
 *
 */
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class SptmtSPMenuKPK implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Column(name = "ROLE_ID")
	public String roleId;
	
	@Column(name = "CODE")
	public String menuCode;
}
