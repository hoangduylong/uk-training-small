/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.portal.dom.toppage;

import lombok.Getter;
import nts.arc.layer.dom.DomainObject;

/**
 * The Class Language.
 */
@Getter
public class Language extends DomainObject {
	
	/** The lang name. */
	private LanguageName langName;
	
	/** The lang num. */
	private LanguageNumber langNum;
}
