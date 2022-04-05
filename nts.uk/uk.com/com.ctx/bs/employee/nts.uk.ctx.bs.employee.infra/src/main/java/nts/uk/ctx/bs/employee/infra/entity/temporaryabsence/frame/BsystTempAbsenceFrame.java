/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.temporaryabsence.frame;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class BsystTempAbsenceFrame.
 */
@Getter
@Setter
@Entity
@Table(name = "BSYST_TEMP_ABSENCE_FRAME")
public class BsystTempAbsenceFrame extends ContractUkJpaEntity implements Serializable {
    
    /** The Constant serialVersionUID. */
    private static final long serialVersionUID = 1L;
    
    /** The bsyst temp absence frame PK. */
    @EmbeddedId
    protected BsystTempAbsenceFramePK bsystTempAbsenceFramePK;
    
    /** The exclus ver. */
    @Column(name = "EXCLUS_VER")
    private int exclusVer;
    
    /** The use atr. */
    @Column(name = "USE_ATR")
    private short useAtr;
    
    /** The temp absence fr name. */
    @Column(name = "TEMP_ABSENCE_FR_NAME")
    private String tempAbsenceFrName;

    /**
     * Instantiates a new bsyst temp absence frame.
     */
    public BsystTempAbsenceFrame() {
    	super();
    }

    /* (non-Javadoc)
     * @see nts.arc.layer.infra.data.entity.JpaEntity#hashCode()
     */
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (bsystTempAbsenceFramePK != null ? bsystTempAbsenceFramePK.hashCode() : 0);
        return hash;
    }

    /* (non-Javadoc)
     * @see nts.arc.layer.infra.data.entity.JpaEntity#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object object) {
        if (!(object instanceof BsystTempAbsenceFrame)) {
            return false;
        }
        BsystTempAbsenceFrame other = (BsystTempAbsenceFrame) object;
        if ((this.bsystTempAbsenceFramePK == null && other.bsystTempAbsenceFramePK != null) || (this.bsystTempAbsenceFramePK != null && !this.bsystTempAbsenceFramePK.equals(other.bsystTempAbsenceFramePK))) {
            return false;
        }
        return true;
    }

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.bsystTempAbsenceFramePK;
	}
    
}
