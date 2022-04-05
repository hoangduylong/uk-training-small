/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.lockoutdata;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;


/**
 * The Class SgwdtContract_.
 */
@StaticMetamodel(SgwdtLockout.class)
public class SgwdtLockout_ {
    
    /** The sgwmt logout data PK. */
    public static volatile SingularAttribute<SgwdtLockout, SgwdtLockoutPK> sgwdtLockoutDataPK;
    
    /** The lock type. */
    public static volatile SingularAttribute<SgwdtLockout, Integer> lockType;
    
    /** The login method. */
    public static volatile SingularAttribute<SgwdtLockout, Integer> loginMethod;
}
