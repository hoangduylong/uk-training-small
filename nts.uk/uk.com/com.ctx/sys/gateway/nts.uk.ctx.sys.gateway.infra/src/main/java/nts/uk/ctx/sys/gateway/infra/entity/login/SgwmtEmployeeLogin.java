/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.infra.entity.login;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

@Getter
@Setter
@Entity
@Table(name = "SGWMT_EMPLOYEE_LOGIN")

/**
 * Instantiates a new sgwst employee login set.
 */
@NoArgsConstructor
public class SgwmtEmployeeLogin extends UkJpaEntity implements Serializable {
    
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

    /** The contract cd. */
    @Id
    @Column(name = "CONTRACT_CD")
    private String contractCd;
    
    /** The form 2 permit atr. */
    @Column(name = "FORM2_PERMIT_ATR")
    private short form2PermitAtr;
    
    /** The form 3 permit atr. */
    @Column(name = "FORM3_PERMIT_ATR")
    private short form3PermitAtr;

    /**
     * Instantiates a new sgwst employee login set.
     *
     * @param contractCd the contract cd
     */
    public SgwmtEmployeeLogin(String contractCd) {
        this.contractCd = contractCd;
    }

    /* (non-Javadoc)
     * @see nts.arc.layer.infra.data.entity.JpaEntity#hashCode()
     */
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (contractCd != null ? contractCd.hashCode() : 0);
        return hash;
    }

    /* (non-Javadoc)
     * @see nts.arc.layer.infra.data.entity.JpaEntity#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object object) {
        if (!(object instanceof SgwmtEmployeeLogin)) {
            return false;
        }
        SgwmtEmployeeLogin other = (SgwmtEmployeeLogin) object;
        if ((this.contractCd == null && other.contractCd != null) || (this.contractCd != null && !this.contractCd.equals(other.contractCd))) {
            return false;
        }
        return true;
    }

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.contractCd;
	}
    
}
