package nts.uk.ctx.sys.auth.infra.entity.wplmanagementauthority;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class KacmtWorkPlaceAuthorityPK implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Column(name = "ROLE_ID")
	public String roleId;
	
	@Column(name = "CID")
	public String companyId;
	
	@Column(name = "FUNCTION_NO")
	public int functionNo;
}
