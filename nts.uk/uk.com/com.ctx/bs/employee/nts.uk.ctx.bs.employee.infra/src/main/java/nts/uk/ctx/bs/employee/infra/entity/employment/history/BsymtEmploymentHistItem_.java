/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.employment.history;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * The Class BsymtEmploymentHistItem_.
 */
@StaticMetamodel(BsymtEmploymentHistItem.class)
public class BsymtEmploymentHistItem_ {

	/** The his id. */
	public static volatile SingularAttribute<BsymtEmploymentHistItem, String> hisId;

	/** The sid. */
	public static volatile SingularAttribute<BsymtEmploymentHistItem, String> sid;

	/** The emp code. */
	public static volatile SingularAttribute<BsymtEmploymentHistItem, String> empCode;

	/** The salary segment. */
	public static volatile SingularAttribute<BsymtEmploymentHistItem, Integer> salarySegment;

	/** The bsymt employment hist. */
	public static volatile SingularAttribute<BsymtEmploymentHistItem, BsymtAffEmpHist> bsymtEmploymentHist;
}
