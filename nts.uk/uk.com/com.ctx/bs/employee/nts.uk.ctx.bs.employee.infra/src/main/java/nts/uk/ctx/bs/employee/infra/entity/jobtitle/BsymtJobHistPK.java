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
 * The Class BsymtJobHistPK.
 */
@Getter
@Setter
@Embeddable
public class BsymtJobHistPK implements Serializable {
    
    /** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/** The cid. */
    @Column(name = "CID")
    private String cid;
    
    /** The hist id. */
    @Column(name = "HIST_ID")
    private String histId;
    
    /** The job id. */
    @Column(name = "JOB_ID")
    private String jobId;

    /**
     * Instantiates a new bsymt job hist PK.
     */
    public BsymtJobHistPK() {
    	super();
    }

    /**
     * Instantiates a new bsymt job hist PK.
     *
     * @param cid the cid
     * @param histId the hist id
     * @param jobId the job id
     */
    public BsymtJobHistPK(String cid, String histId, String jobId) {
        this.cid = cid;
        this.histId = histId;
        this.jobId = jobId;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#hashCode()
     */
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (cid != null ? cid.hashCode() : 0);
        hash += (histId != null ? histId.hashCode() : 0);
        hash += (jobId != null ? jobId.hashCode() : 0);
        return hash;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object object) {
        if (!(object instanceof BsymtJobHistPK)) {
            return false;
        }
        BsymtJobHistPK other = (BsymtJobHistPK) object;
        if ((this.cid == null && other.cid != null) || (this.cid != null && !this.cid.equals(other.cid))) {
            return false;
        }
        if ((this.histId == null && other.histId != null) || (this.histId != null && !this.histId.equals(other.histId))) {
            return false;
        }
        if ((this.jobId == null && other.jobId != null) || (this.jobId != null && !this.jobId.equals(other.jobId))) {
            return false;
        }
        return true;
    }
    
}
