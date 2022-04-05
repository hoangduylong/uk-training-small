/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.log.infra.entity.loginrecord;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * The Class SgwmtLogoutDataPK_.
 */
@StaticMetamodel(SrcdtLoginCorrection.class)
public class SrcdtLoginRecord_ {

	/** The operation id. */
	public static volatile SingularAttribute<SrcdtLoginCorrection, SrcdtLoginRecordPK> srcdtLoginRecordPK;

	/** The lock status. */
	public static volatile SingularAttribute<SrcdtLoginCorrection, Integer> lockStatus;
	
    /** The login method. */
    public static volatile SingularAttribute<SrcdtLoginCorrection, Integer> loginMethod;
    
	/** The login status. */
	public static volatile SingularAttribute<SrcdtLoginCorrection, Integer> loginStatus;
	
    /** The remarks. */
    public static volatile SingularAttribute<SrcdtLoginCorrection, String> remarks;
    
    /** The url. */
    public static volatile SingularAttribute<SrcdtLoginCorrection, String> url;
}