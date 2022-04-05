/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.infra.entity.login;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * The Class SgwmtUser_.
 */
@StaticMetamodel(SgwmtUser.class)
public class SgwmtUser_ {

	/** The user id. */
	public static volatile SingularAttribute<SgwmtUser, String> userId;
	
	/** The login id. */
	public static volatile SingularAttribute<SgwmtUser, String> loginId;
	
	/** The asso sid. */
	public static volatile SingularAttribute<SgwmtUser, String> assoSid;
}
