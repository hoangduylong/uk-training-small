/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.employee.order;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

/**
 * The Class BsymtEmployeeOrderPK.
 */
@Embeddable
@Getter
@Setter
public class BsymtEmployeeOrderPK implements Serializable {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The cid. */
	@Column(name="CID")
	private String cid;

	/** The no. */
	@Column(name="NO")
	private Integer no;

	/** The search type. */
	@Column(name="SYSTEM_TYPE")
	private Integer searchType;

	/**
	 * Instantiates a new bsymt employee order PK.
	 *
	 * @param cid the cid
	 * @param no the no
	 * @param searchType the search type
	 */
	public BsymtEmployeeOrderPK(String cid, Integer no, Integer searchType) {
		this.cid = cid;
		this.no = no;
		this.searchType = searchType;
	}

	/**
	 * Instantiates a new bsymt employee order PK.
	 */
	public BsymtEmployeeOrderPK() {
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof BsymtEmployeeOrderPK)) {
			return false;
		}
		BsymtEmployeeOrderPK castOther = (BsymtEmployeeOrderPK)other;
		return 
			this.cid.equals(castOther.cid)
			&& (this.no == castOther.no)
			&& (this.searchType == castOther.searchType);
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.cid.hashCode();
		hash = hash * prime + ((int) (this.no ^ (this.no >>> 32)));
		hash = hash * prime + ((int) (this.searchType ^ (this.searchType >>> 32)));
		
		return hash;
	}
}