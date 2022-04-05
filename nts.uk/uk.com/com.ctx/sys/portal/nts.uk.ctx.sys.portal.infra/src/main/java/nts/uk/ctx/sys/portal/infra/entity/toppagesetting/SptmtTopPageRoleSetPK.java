package nts.uk.ctx.sys.portal.infra.entity.toppagesetting;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The Class SptmtTopPageRoleSetPK.
 */
@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SptmtTopPageRoleSetPK {

    /**  Company ID. */
	@Column(name = "CID")
	private String companyId;
	
	/** The role set code. */
	@Column(name = "ROLE_SET_CD")
	private String roleSetCode;
}
