package nts.uk.ctx.sys.portal.infra.entity.smartphonetoppageset;

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
public class SptmtSPTopPagePK implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Column(name = "CID")
	public String companyId;

	@Column(name = "SYSTEM_ATR")
	public int systemAtr;

	@Column(name = "TYPE")
	public int type;
}
