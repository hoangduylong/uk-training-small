/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.classification;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * The Class BsymtClassification_.
 */
@StaticMetamodel(BsymtClassification.class)
public class BsymtClassification_ {

	/** The bsymt classification PK. */
	public static volatile SingularAttribute<BsymtClassification, BsymtClassificationPK> bsymtClassificationPK;

	/** The name. */
	public static volatile SingularAttribute<BsymtClassification, String> name;

}