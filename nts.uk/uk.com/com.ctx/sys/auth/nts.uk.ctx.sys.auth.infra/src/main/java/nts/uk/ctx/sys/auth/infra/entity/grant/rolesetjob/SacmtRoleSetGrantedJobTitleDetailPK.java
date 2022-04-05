package nts.uk.ctx.sys.auth.infra.entity.grant.rolesetjob;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * 
 * @author HungTT
 *
 */

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class SacmtRoleSetGrantedJobTitleDetailPK implements Serializable {

	private static final long serialVersionUID = 1L;

	@Basic(optional = false)
	@Column(name = "JOB_ID")
	public String jobTitleId;

	@Basic(optional = false)
	@Column(name = "CID")
	public String companyId;

	public boolean equals(SacmtRoleSetGrantedJobTitleDetailPK pk) {
		return (this.companyId.equals(pk.companyId) && this.jobTitleId.equals(pk.jobTitleId));
	}
}
