/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.adapter.person;

import lombok.Builder;
import lombok.Getter;

/**
 * The Class PersonInfoImport.
 */
@Getter
@Builder
public class PersonInfoImport {

	/** The person id. */
	private String personId;

	/** The business name. */
	private String businessName;

	/**
	 * Instantiates a new person info import.
	 *
	 * @param personId the person id
	 * @param businessName the business name
	 */
	public PersonInfoImport(String personId, String businessName) {
		super();
		this.personId = personId;
		this.businessName = businessName;
	}

}
