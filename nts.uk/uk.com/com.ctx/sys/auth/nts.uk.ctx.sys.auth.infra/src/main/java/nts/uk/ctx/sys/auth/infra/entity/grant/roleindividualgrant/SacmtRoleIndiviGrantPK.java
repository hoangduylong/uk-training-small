/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.infra.entity.grant.roleindividualgrant;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class SacmtRoleIndiviGrantPK implements Serializable {
	
	private static final long serialVersionUID = 1L;
	@NotNull
	@Column(name = "CID")
    public String companyID;

	@NotNull
	@Column(name = "USER_ID")
    public String userID;
	
	@NotNull
	@Column(name = "ROLE_TYPE")
    public int roleType;

}
