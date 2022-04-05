/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.jobtitle;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

/**
 * The Class BsymtJobSeqMasterPK.
 */
@Getter
@Setter
@Embeddable
public class BsymtJobSeqMasterPK implements Serializable {
    
    /** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
    /** The cid. */
    @Column(name = "CID")
    private String cid;
    
    /** The seq cd. */
    @Column(name = "SEQ_CD")
    private String seqCd;

    /**
     * Instantiates a new bsymt job seq master PK.
     */
    public BsymtJobSeqMasterPK() {
    }

    /**
     * Instantiates a new bsymt job seq master PK.
     *
     * @param cid the cid
     * @param seqCd the seq cd
     */
    public BsymtJobSeqMasterPK(String cid, String seqCd) {
        this.cid = cid;
        this.seqCd = seqCd;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#hashCode()
     */
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (cid != null ? cid.hashCode() : 0);
        hash += (seqCd != null ? seqCd.hashCode() : 0);
        return hash;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object object) {
        if (!(object instanceof BsymtJobSeqMasterPK)) {
            return false;
        }
        BsymtJobSeqMasterPK other = (BsymtJobSeqMasterPK) object;
        if ((this.cid == null && other.cid != null) || (this.cid != null && !this.cid.equals(other.cid))) {
            return false;
        }
        if ((this.seqCd == null && other.seqCd != null) || (this.seqCd != null && !this.seqCd.equals(other.seqCd))) {
            return false;
        }
        return true;
    }
    
}
