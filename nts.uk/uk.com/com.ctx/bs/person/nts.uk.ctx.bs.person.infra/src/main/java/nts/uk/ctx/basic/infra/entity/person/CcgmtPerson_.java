/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.basic.infra.entity.person;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

/**
 * Change to use the BpsdtPerson class
 * The Class CcgmtPerson_.
 */
@StaticMetamodel(CcgmtPerson.class)
public class CcgmtPerson_ {
	

	/** The pid. */
	public static volatile SingularAttribute<CcgmtPerson, String> pid;
	
	/** The p name. */
	public static volatile SingularAttribute<CcgmtPerson, String> pName;
	
	
}
