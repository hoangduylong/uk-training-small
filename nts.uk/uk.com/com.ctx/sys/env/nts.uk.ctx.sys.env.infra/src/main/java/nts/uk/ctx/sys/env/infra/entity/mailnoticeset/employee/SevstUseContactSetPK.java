/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.infra.entity.mailnoticeset.employee;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class SevstUseContactSetPK implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The cid. */
	@Column(name = "CID")
	private String cid;

	/** The sid. */
	@Column(name = "SID")
	private String sid;

	/** The set item. */
	@Column(name = "SETTING_ITEM")
	private int setItem;

	/**
	 * Instantiates a new sevst use contact set PK.
	 */
	public SevstUseContactSetPK() {
	}

	/**
	 * Instantiates a new sevst use contact set PK.
	 *
	 * @param cid
	 *            the cid
	 * @param sid
	 *            the sid
	 * @param setItem
	 *            the set item
	 */
	public SevstUseContactSetPK(String cid, String sid, int setItem) {
		this.cid = cid;
		this.sid = sid;
		this.setItem = setItem;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "javaapplication1.SevstUseContactSetPK[ cid=" + cid + ", sid=" + sid + " ]";
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((cid == null) ? 0 : cid.hashCode());
		result = prime * result + setItem;
		result = prime * result + ((sid == null) ? 0 : sid.hashCode());
		return result;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SevstUseContactSetPK other = (SevstUseContactSetPK) obj;
		if (cid == null) {
			if (other.cid != null)
				return false;
		} else if (!cid.equals(other.cid))
			return false;
		if (setItem != other.setItem)
			return false;
		if (sid == null) {
			if (other.sid != null)
				return false;
		} else if (!sid.equals(other.sid))
			return false;
		return true;
	}
}
