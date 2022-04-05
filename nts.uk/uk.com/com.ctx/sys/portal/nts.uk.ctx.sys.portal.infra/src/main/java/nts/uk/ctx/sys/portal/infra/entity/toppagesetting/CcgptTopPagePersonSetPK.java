package nts.uk.ctx.sys.portal.infra.entity.toppagesetting;

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
public class CcgptTopPagePersonSetPK {
	/** The companyId. */
	@Column(name = "CID")
	public String companyId;

	/** The employee id. */
	@Column(name = "SID")
	public String employeeId;
}
