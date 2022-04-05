/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.jobtitle.affiliate;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

import nts.arc.time.GeneralDate;

/**
 * The Class BsymtAffJobTitleHist_.
 */
@StaticMetamodel(BsymtAffJobTitleHist.class)
public class BsymtAffJobTitleHist_ {

	/** The his id. */
	public static volatile SingularAttribute<BsymtAffJobTitleHist, String> hisId;

	/** The sid. */
	public static volatile SingularAttribute<BsymtAffJobTitleHist, String> sid;

	/** The cid. */
	public static volatile SingularAttribute<BsymtAffJobTitleHist, String> cid;

	/** The str date. */
	public static volatile SingularAttribute<BsymtAffJobTitleHist, GeneralDate> strDate;

	/** The end date. */
	public static volatile SingularAttribute<BsymtAffJobTitleHist, GeneralDate> endDate;
	
	/** The bsymt aff job title hist item. */
	public static volatile SingularAttribute<BsymtAffJobTitleHist, BsymtAffJobTitleHistItem> bsymtAffJobTitleHistItem;

}
