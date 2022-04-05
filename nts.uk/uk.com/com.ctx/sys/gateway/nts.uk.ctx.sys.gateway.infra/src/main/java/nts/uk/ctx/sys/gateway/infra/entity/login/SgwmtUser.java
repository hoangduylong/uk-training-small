/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.infra.entity.login;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

/**
 * The Class SgwmtUser.
 */
@Getter
@Setter
@Entity
@Table(name = "SGWMT_USER")
@NoArgsConstructor
@AllArgsConstructor
public class SgwmtUser extends ContractUkJpaEntity implements Serializable {
    
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
    
    /** The user id. */
    @Id
    @Column(name = "USER_ID")
    private String userId;
    
    /** The password. */
    @Column(name = "PASSWORD")
    private String password;
    
    /** The login id. */
    @Column(name = "LOGIN_ID")
    private String loginId;
    
    /** The expiration date. */
    @Column(name = "EXPIRATION_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date expirationDate;
    
    /** The special user. */
    @Column(name = "SPECIAL_USER")
    private short specialUser;
    
    /** The multi com. */
    @Column(name = "MULTI_COM")
    private short multiCom;
    
    /** The mail add. */
    @Column(name = "MAIL_ADD")
    private String mailAdd;
    
    /** The user name. */
    @Column(name = "USER_NAME")
    private String userName;
    
    /** The asso sid. */
    @Column(name = "ASSO_SID")
    private String assoSid;

    /* (non-Javadoc)
     * @see nts.arc.layer.infra.data.entity.JpaEntity#hashCode()
     */
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (userId != null ? userId.hashCode() : 0);
        return hash;
    }

    /* (non-Javadoc)
     * @see nts.arc.layer.infra.data.entity.JpaEntity#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object object) {
        if (!(object instanceof SgwmtUser)) {
            return false;
        }
        SgwmtUser other = (SgwmtUser) object;
        if ((this.userId == null && other.userId != null) || (this.userId != null && !this.userId.equals(other.userId))) {
            return false;
        }
        return true;
    }

	/* (non-Javadoc)
	 * @see nts.arc.layer.infra.data.entity.JpaEntity#getKey()
	 */
	@Override
	protected Object getKey() {
		return this.userId;
	}
}
