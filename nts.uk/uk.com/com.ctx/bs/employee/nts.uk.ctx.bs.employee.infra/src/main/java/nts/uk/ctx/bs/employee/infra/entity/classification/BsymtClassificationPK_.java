/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.classification;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * The Class BsymtClassificationPK_.
 */
@StaticMetamodel(BsymtClassificationPK.class)
public class BsymtClassificationPK_ {

	/** The cid. */
	public static volatile SingularAttribute<BsymtClassificationPK, String> cid;

	/** The code. */
	public static volatile SingularAttribute<BsymtClassificationPK, String> clscd;

}