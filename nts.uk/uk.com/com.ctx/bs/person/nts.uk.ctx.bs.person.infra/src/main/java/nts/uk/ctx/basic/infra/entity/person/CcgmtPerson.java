/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.basic.infra.entity.person;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * Change to use the BpsdtPerson class
 * The Class CcgmtPerson.
 */
@Getter
@Setter
@Entity
@Table(name = "CCGMT_PERSON")
public class CcgmtPerson extends ContractUkJpaEntity implements Serializable {

    /** The Constant serialVersionUID. */
    private static final long serialVersionUID = 1L;
    
    /** The pid. */
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "PID")
    private String pid;
    
    /** The p name. */
    @Column(name = "P_NAME")
    private String pName;

    /**
     * Instantiates a new ccgmt person.
     */
    public CcgmtPerson() {
    }

    /**
     * Instantiates a new ccgmt person.
     *
     * @param pid the pid
     */
    public CcgmtPerson(String pid) {
        this.pid = pid;
    }

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.pid;
	}
    
    
}
