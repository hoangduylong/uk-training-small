/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.department;

import lombok.Getter;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;


/**
 * The Class BsymtDepartmentInfoPK.
 */
@Embeddable
@Getter
public class BsymtDepartmentInfoPK implements Serializable {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/** The cid. */
    @Column(name = "CID")
    private String cid;
    
    /** The hist id. */
    @Column(name = "HIST_ID")
    private String histId;
    
    /** The dep id. */
    @Column(name = "DEP_ID")
    private String depId;
    
    /* (non-Javadoc)
     * @see java.lang.Object#hashCode()
     */
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (cid != null ? cid.hashCode() : 0);
        hash += (histId != null ? histId.hashCode() : 0);
        hash += (depId != null ? depId.hashCode() : 0);
        return hash;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object object) {
        if (!(object instanceof BsymtDepartmentInfoPK)) {
            return false;
        }
        BsymtDepartmentInfoPK other = (BsymtDepartmentInfoPK) object;
        if ((this.cid == null && other.cid != null) || (this.cid != null && !this.cid.equals(other.cid))) {
            return false;
        }
        if ((this.histId == null && other.histId != null) || (this.histId != null && !this.histId.equals(other.histId))) {
            return false;
        }
        if ((this.depId == null && other.depId != null) || (this.depId != null && !this.depId.equals(other.depId))) {
            return false;
        }
        return true;
    }
}
