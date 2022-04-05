/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.jobtitle.affiliate;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * The Class BsymtAffJobTitleHistItem_.
 */
@StaticMetamodel(BsymtAffJobTitleHistItem.class)
public class BsymtAffJobTitleHistItem_ {

	/** The his id. */
	public static volatile SingularAttribute<BsymtAffJobTitleHistItem, String> hisId;

	/** The sid. */
	public static volatile SingularAttribute<BsymtAffJobTitleHistItem, String> sid;

	/** The job title id. */
	public static volatile SingularAttribute<BsymtAffJobTitleHistItem, String> jobTitleId;

	/** The note. */
	public static volatile SingularAttribute<BsymtAffJobTitleHistItem, String> note;
	
	/** The bsymt aff job title hist. */
	public static volatile SingularAttribute<BsymtAffJobTitleHistItem, BsymtAffJobTitleHist> bsymtAffJobTitleHist;

}
