/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.employment;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class BsymtEmploymentPK.
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
@Embeddable
public class BsymtEmploymentPK implements Serializable {
/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/** The cid. */
	@Basic(optional = false)
	@Column(name="CID")
	private String cid;
	
	/** The code. */
	@Basic(optional = false)
	@Column(name="CODE")
	private String code;
	
}
