/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.employment;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * The Class BsymtEmploymentPK_.
 */
@StaticMetamodel(BsymtEmploymentPK.class)
public class BsymtEmploymentPK_ {

	/** The company id. */
	public static volatile SingularAttribute<BsymtEmploymentPK, String> cid;
	
	/** The code. */
	public static volatile SingularAttribute<BsymtEmploymentPK, String> code;
	
}
