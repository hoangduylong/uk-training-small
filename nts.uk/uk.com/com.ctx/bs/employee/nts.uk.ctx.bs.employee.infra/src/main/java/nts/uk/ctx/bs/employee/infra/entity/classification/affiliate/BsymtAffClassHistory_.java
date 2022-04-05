/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.classification.affiliate;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

import nts.arc.time.GeneralDate;

/**
 * The Class BsymtAffClassHistory_.
 */
@StaticMetamodel(BsymtAffClassHist.class)
public class BsymtAffClassHistory_ {

	/** The history id. */
	public static volatile SingularAttribute<BsymtAffClassHist, String> historyId;

	/** The cid. */
	public static volatile SingularAttribute<BsymtAffClassHist, String> cid;

	/** The sid. */
	public static volatile SingularAttribute<BsymtAffClassHist, String> sid;

	/** The start date. */
	public static volatile SingularAttribute<BsymtAffClassHist, GeneralDate> startDate;

	/** The end date. */
	public static volatile SingularAttribute<BsymtAffClassHist, GeneralDate> endDate;
	
	/** The bsymt aff class hist item. */
	public static volatile SingularAttribute<BsymtAffClassHist,  BsymtAffClassHistItem> bsymtAffClassHistItem;

}
