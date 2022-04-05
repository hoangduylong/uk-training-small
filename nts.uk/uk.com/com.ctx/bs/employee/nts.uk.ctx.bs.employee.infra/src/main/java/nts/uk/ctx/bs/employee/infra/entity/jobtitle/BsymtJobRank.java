/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.jobtitle;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class BsymtJobRank.
 */
@Getter
@Setter
@Entity
@Table(name = "BSYMT_JOB_RANK")
public class BsymtJobRank extends ContractUkJpaEntity implements Serializable {
	
    /** The Constant serialVersionUID. */
    private static final long serialVersionUID = 1L;
    
    /** The bsymt job seq master PK. */
    @EmbeddedId
    protected BsymtJobSeqMasterPK bsymtJobSeqMasterPK;
    
    /** The seq name. */
    @Column(name = "SEQ_NAME")
    private String seqName;
   
    /** The disporder. */
    @Column(name = "DISPORDER")
    private int disporder;

    /**
     * Instantiates a new bsymt job seq master.
     */
    public BsymtJobRank() {
    	super();
    }

    /**
     * Instantiates a new bsymt job seq master.
     *
     * @param bsymtJobSeqMasterPK the bsymt job seq master PK
     */
    public BsymtJobRank(BsymtJobSeqMasterPK bsymtJobSeqMasterPK) {
        this.bsymtJobSeqMasterPK = bsymtJobSeqMasterPK;
    }
   
    /* (non-Javadoc)
     * @see nts.arc.layer.infra.data.entity.JpaEntity#hashCode()
     */
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (bsymtJobSeqMasterPK != null ? bsymtJobSeqMasterPK.hashCode() : 0);
        return hash;
    }

    /* (non-Javadoc)
     * @see nts.arc.layer.infra.data.entity.JpaEntity#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object object) {
        if (!(object instanceof BsymtJobRank)) {
            return false;
        }
        BsymtJobRank other = (BsymtJobRank) object;
        if ((this.bsymtJobSeqMasterPK == null && other.bsymtJobSeqMasterPK != null) || (this.bsymtJobSeqMasterPK != null && !this.bsymtJobSeqMasterPK.equals(other.bsymtJobSeqMasterPK))) {
            return false;
        }
        return true;
    }

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.bsymtJobSeqMasterPK;
	}
    
}
