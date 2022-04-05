/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.loginlog;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

import nts.arc.time.GeneralDateTime;


/**
 * The Class SgwdtContract_.
 */
@StaticMetamodel(SgwdtLoginLog.class)
public class SgwmtLoginLog_ {
    
    /** The sgwmt logout data PK. */
    public static volatile SingularAttribute<SgwdtLoginLog, Long> idNumber;
    
    /** The operation section. */
    public static volatile SingularAttribute<SgwdtLoginLog, Integer> operationSection;
    
    /** The success or failure. */
    public static volatile SingularAttribute<SgwdtLoginLog, Integer> successOrFailure;
    
    /** The sgwmt logout data PK. */
	public static volatile SingularAttribute<SgwdtLoginLog, String> userId;

	/** The contract cd. */
	public static volatile SingularAttribute<SgwdtLoginLog, String> contractCd;
	
	/** The program id. */
	public static volatile SingularAttribute<SgwdtLoginLog, String> programId;
	
	/** The process date time. */
	public static volatile SingularAttribute<SgwdtLoginLog, GeneralDateTime> processDateTime;
}
