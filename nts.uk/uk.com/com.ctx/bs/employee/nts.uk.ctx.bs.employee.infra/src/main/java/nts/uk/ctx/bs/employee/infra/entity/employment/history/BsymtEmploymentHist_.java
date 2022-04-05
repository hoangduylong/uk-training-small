/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.employment.history;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

import nts.arc.time.GeneralDate;

/**
 * The Class BsymtEmploymentHist_.
 */
@StaticMetamodel(BsymtAffEmpHist.class)
public class BsymtEmploymentHist_ {

	/** The his id. */
	public static volatile SingularAttribute<BsymtAffEmpHist, String> hisId;

	/** The company id. */
	public static volatile SingularAttribute<BsymtAffEmpHist, String> companyId;

	/** The sid. */
	public static volatile SingularAttribute<BsymtAffEmpHist, String> sid;

	/** The str date. */
	public static volatile SingularAttribute<BsymtAffEmpHist, GeneralDate> strDate;

	/** The end date. */
	public static volatile SingularAttribute<BsymtAffEmpHist, GeneralDate> endDate;

}
