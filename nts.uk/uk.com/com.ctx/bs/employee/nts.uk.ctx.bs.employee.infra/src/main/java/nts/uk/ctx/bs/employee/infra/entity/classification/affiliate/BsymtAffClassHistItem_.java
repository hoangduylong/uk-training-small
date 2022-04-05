/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.classification.affiliate;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * The Class BsymtAffClassHistItem_.
 */
@StaticMetamodel(BsymtAffClassHistItem.class)
public class BsymtAffClassHistItem_ {

	/** The history id. */
	public static volatile SingularAttribute<BsymtAffClassHistItem, String> historyId;

	/** The sid. */
	public static volatile SingularAttribute<BsymtAffClassHistItem, String> sid;

	/** The classification code. */
	public static volatile SingularAttribute<BsymtAffClassHistItem, String> classificationCode;
	
	/** The bsymt aff class history. */
	public static volatile SingularAttribute<BsymtAffClassHistItem, BsymtAffClassHist> bsymtAffClassHistory;

}
