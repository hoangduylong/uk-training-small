/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.department;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class BsymtDepartmentHist.
 */
@Entity
@Table(name = "BSYMT_DEPARTMENT_HIST")
@Setter
@Getter
public class BsymtDepartmentHist extends ContractUkJpaEntity implements Serializable {
    
    /** The Constant serialVersionUID. */
    private static final long serialVersionUID = 1L;
    
    /** The bsymt department hist PK. */
    @EmbeddedId
    protected BsymtDepartmentHistPK bsymtDepartmentHistPK;
    
    /** The str D. */
    @Column(name = "STR_D")
    private GeneralDate strD;
    
    /** The end D. */
    @Basic(optional = false)
    @Column(name = "END_D")
    private GeneralDate endD;
    
    /* (non-Javadoc)
     * @see nts.arc.layer.infra.data.entity.JpaEntity#hashCode()
     */
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (bsymtDepartmentHistPK != null ? bsymtDepartmentHistPK.hashCode() : 0);
        return hash;
    }

    /* (non-Javadoc)
     * @see nts.arc.layer.infra.data.entity.JpaEntity#equals(java.lang.Object)
     */
	@Override
	public boolean equals(Object object) {
		if (!(object instanceof BsymtDepartmentHist)) {
			return false;
		}
		BsymtDepartmentHist other = (BsymtDepartmentHist) object;
		if ((this.bsymtDepartmentHistPK == null && other.bsymtDepartmentHistPK != null)
				|| (this.bsymtDepartmentHistPK != null
						&& !this.bsymtDepartmentHistPK.equals(other.bsymtDepartmentHistPK))) {
			return false;
		}
		return true;
	}

    /* (non-Javadoc)
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "entity.BsymtDepartmentHist[ bsymtDepartmentHistPK=" + bsymtDepartmentHistPK + " ]";
    }

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.bsymtDepartmentHistPK;
	}
    
}
