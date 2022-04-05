/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.temporaryabsence.frame;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

/**
 * The Class BsystTempAbsenceFramePK.
 */
@Getter
@Setter
@Embeddable
public class BsystTempAbsenceFramePK implements Serializable {
    
    /** The Constant serialVersionUID. */
	private static final long serialVersionUID = 5073122022229618407L;
	
	/** The cid. */
	@Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 17)
    @Column(name = "CID")
    private String cid;
    
    /** The temp absence fr no. */
    @Basic(optional = false)
    @NotNull
    @Column(name = "TEMP_ABSENCE_FR_NO")
    private int tempAbsenceFrNo;

    /**
     * Instantiates a new bsyst temp absence frame PK.
     */
    public BsystTempAbsenceFramePK() {
    	super();
    }
    
    /* (non-Javadoc)
     * @see java.lang.Object#hashCode()
     */
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (cid != null ? cid.hashCode() : 0);
        hash += tempAbsenceFrNo;
        return hash;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object object) {
        if (!(object instanceof BsystTempAbsenceFramePK)) {
            return false;
        }
        BsystTempAbsenceFramePK other = (BsystTempAbsenceFramePK) object;
        if ((this.cid == null && other.cid != null) || (this.cid != null && !this.cid.equals(other.cid))) {
            return false;
        }
        if (this.tempAbsenceFrNo != other.tempAbsenceFrNo) {
            return false;
        }
        return true;
    }

	/**
	 * Instantiates a new bsyst temp absence frame PK.
	 *
	 * @param cid the cid
	 * @param tempAbsenceFrNo the temp absence fr no
	 */
	public BsystTempAbsenceFramePK(String cid, int tempAbsenceFrNo) {
		super();
		this.cid = cid;
		this.tempAbsenceFrNo = tempAbsenceFrNo;
	}
    
}
