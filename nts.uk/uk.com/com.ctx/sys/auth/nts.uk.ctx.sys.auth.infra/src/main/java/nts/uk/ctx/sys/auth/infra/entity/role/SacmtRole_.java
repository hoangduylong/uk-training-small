/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.infra.entity.role;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * The Class SacmtRole_.
 */
@StaticMetamodel(SacmtRole.class)
public class SacmtRole_ {
	/** The id. */
	public static volatile SingularAttribute<SacmtRole, String> roleId;
	
	/** The cid. */
	public static volatile SingularAttribute<SacmtRole, String> cid;
}
