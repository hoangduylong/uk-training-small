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
 * The Class BsymtEmpOrderCondPK.
 */
@Embeddable
@Setter
@Getter
public class BsymtEmpOrderCondPK implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The cid. */
	@Column(name = "CID")
	private String cid;

	/** The no. */
	@Column(name = "NO")
	private Integer no;

	/** The search type. */
	@Column(name = "SYSTEM_TYPE")
	private Integer searchType;

	/** The order type. */
	@Column(name = "ORDER_TYPE")
	private Integer orderType;

	/**
	 * Instantiates a new bsymt emp order cond PK.
	 */
	public BsymtEmpOrderCondPK() {
	}

	/**
	 * Instantiates a new bsymt emp order cond PK.
	 *
	 * @param cid the cid
	 * @param no the no
	 * @param searchType the search type
	 * @param orderType the order type
	 */
	public BsymtEmpOrderCondPK(String cid, Integer no, Integer searchType, Integer orderType) {
		this.cid = cid;
		this.no = no;
		this.searchType = searchType;
		this.orderType = orderType;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof BsymtEmpOrderCondPK)) {
			return false;
		}
		BsymtEmpOrderCondPK castOther = (BsymtEmpOrderCondPK) other;
		return this.cid.equals(castOther.cid) && (this.no == castOther.no) && (this.searchType == castOther.searchType)
				&& (this.orderType == castOther.orderType);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.cid.hashCode();
		hash = hash * prime + ((int) (this.no ^ (this.no >>> 32)));
		hash = hash * prime + ((int) (this.searchType ^ (this.searchType >>> 32)));
		hash = hash * prime + ((int) (this.orderType ^ (this.orderType >>> 32)));

		return hash;
	}
}