/**
 * author hieult
 */
package nts.uk.ctx.sys.portal.infra.entity.titlemenu;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class CcgmtTitleMenuPK implements Serializable {
	private static final long serialVersionUID = 1L;

	@NotNull
	@Column(name = "CID")
	public String companyID;
	@NotNull
	@Column(name = "TITLEMENU_CD")
	public String titleMenuCD;



}
