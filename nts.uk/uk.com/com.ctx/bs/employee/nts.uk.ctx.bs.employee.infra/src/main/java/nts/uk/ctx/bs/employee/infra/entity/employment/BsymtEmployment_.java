/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.employment;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * The Class BsymtEmployment_.
 */
@StaticMetamodel(BsymtEmployment.class)
public class BsymtEmployment_ {
	

	/** The bsymt employment PK. */
	public static volatile SingularAttribute<BsymtEmployment, BsymtEmploymentPK> bsymtEmploymentPK;
	
	/** The name. */
	public static volatile SingularAttribute<BsymtEmployment, String> name;
	
	/** The emp external code. */
	public static volatile SingularAttribute<BsymtEmployment, String> empExternalCode;
	
	/** The memo. */
	public static volatile SingularAttribute<BsymtEmployment, String> memo;
	
}
