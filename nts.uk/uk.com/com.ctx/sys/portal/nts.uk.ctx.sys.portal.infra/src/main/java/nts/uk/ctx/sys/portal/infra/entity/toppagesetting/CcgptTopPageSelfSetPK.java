package nts.uk.ctx.sys.portal.infra.entity.toppagesetting;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class CcgptTopPageSelfSetPK implements Serializable {

	private static final long serialVersionUID = 1L;
	/** The employee Id. */
	@Column(name = "SID")
	public String employeeId;
}
