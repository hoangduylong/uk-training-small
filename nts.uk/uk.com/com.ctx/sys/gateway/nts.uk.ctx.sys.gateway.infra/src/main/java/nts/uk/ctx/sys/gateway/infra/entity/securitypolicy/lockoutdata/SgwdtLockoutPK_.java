/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.lockoutdata;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

import nts.arc.time.GeneralDateTime;

/**
 * The Class SgwmtLogoutDataPK_.
 */
@StaticMetamodel(SgwdtLockoutPK.class)
public class SgwdtLockoutPK_ {

	/** The sgwmt logout data PK. */
	public static volatile SingularAttribute<SgwdtLockoutPK, String> userId;

	/** The contract cd. */
	public static volatile SingularAttribute<SgwdtLockoutPK, String> contractCd;
	
	/** The lockout date time. */
    public static volatile SingularAttribute<SgwdtLockout, GeneralDateTime> lockoutDateTime;
}
