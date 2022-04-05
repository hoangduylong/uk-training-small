/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.jobtitle;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.arc.layer.infra.data.entity.type.GeneralDateToDBConverter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class BsymtJobHist.
 */
@Getter
@Setter
@Entity
@Table(name = "BSYMT_JOB_HIST")
public class BsymtJobHist extends ContractUkJpaEntity implements Serializable {
	
    /** The Constant serialVersionUID. */
    private static final long serialVersionUID = 1L;
    
    /** The bsymt job hist PK. */
    @EmbeddedId
    protected BsymtJobHistPK bsymtJobHistPK;
    
    /** The start date. */
    @Column(name = "START_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
    private GeneralDate startDate;
    
    /** The end date. */
    @Column(name = "END_DATE")
	@Convert(converter = GeneralDateToDBConverter.class)
    private GeneralDate endDate;

    /**
     * Instantiates a new bsymt job hist.
     */
    public BsymtJobHist() {
    	super();
    }

    /**
     * Instantiates a new bsymt job hist.
     *
     * @param bsymtJobHistPK the bsymt job hist PK
     */
    public BsymtJobHist(BsymtJobHistPK bsymtJobHistPK) {
        this.bsymtJobHistPK = bsymtJobHistPK;
    }

    /* (non-Javadoc)
     * @see nts.arc.layer.infra.data.entity.JpaEntity#hashCode()
     */
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (bsymtJobHistPK != null ? bsymtJobHistPK.hashCode() : 0);
        return hash;
    }

    /* (non-Javadoc)
     * @see nts.arc.layer.infra.data.entity.JpaEntity#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object object) {
        if (!(object instanceof BsymtJobHist)) {
            return false;
        }
        BsymtJobHist other = (BsymtJobHist) object;
        if ((this.bsymtJobHistPK == null && other.bsymtJobHistPK != null) || (this.bsymtJobHistPK != null && !this.bsymtJobHistPK.equals(other.bsymtJobHistPK))) {
            return false;
        }
        return true;
    }

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.bsymtJobHistPK;
	}
    
}
