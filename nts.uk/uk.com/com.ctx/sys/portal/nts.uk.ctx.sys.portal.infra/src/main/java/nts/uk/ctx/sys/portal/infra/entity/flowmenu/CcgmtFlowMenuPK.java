/**
 * author hieult
 */
package nts.uk.ctx.sys.portal.infra.entity.flowmenu;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class CcgmtFlowMenuPK implements Serializable {
	private static final long serialVersionUID = 1L;

	@NotNull
	@Column(name = "CID")
	public String companyID;
	@NotNull
	@Column(name = "CODE")
	public String code;

}
