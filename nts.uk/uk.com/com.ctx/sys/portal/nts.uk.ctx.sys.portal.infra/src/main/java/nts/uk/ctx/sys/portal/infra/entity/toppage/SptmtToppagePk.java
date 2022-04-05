/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.infra.entity.toppage;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class SptmtToppagePk implements Serializable {
	
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	/** The cid. */
	@Column(name = "CID")
	public String cid;

	/** The top page code. */
	@Column(name = "TOP_PAGE_CD")
	public String topPageCode;

}