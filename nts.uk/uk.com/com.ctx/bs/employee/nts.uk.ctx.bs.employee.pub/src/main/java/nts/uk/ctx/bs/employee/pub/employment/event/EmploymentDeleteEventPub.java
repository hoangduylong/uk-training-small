/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.employment.event;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.layer.dom.event.DomainEvent;

/**
 * The Class EmploymentDeleteEventPub.
 * @author NWS_HoangDD
 */
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Getter
public class EmploymentDeleteEventPub extends DomainEvent{
	
	/** The company id. */
	private String companyId;
	
	/** The employmentcode. */
	private String employmentcode;

	/**
	 * Instantiates a new employment delete event pub.
	 *
	 * @param companyId the company id
	 * @param employmentcode the employmentcode
	 */
	public EmploymentDeleteEventPub(String companyId, String employmentcode) {
		super();
		this.companyId = companyId;
		this.employmentcode = employmentcode;
	}
}

