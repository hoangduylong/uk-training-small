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
 * The Class EmploymentCreateEventPub.
 * @author NWS-HoangDD
 */
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Getter
public class EmploymentCreateEventPub extends DomainEvent{
	
	/** The company id. */
	private String companyId;
	
	/** The employmentcode. */
	private String employmentcode;

	/**
	 * Instantiates a new employment create event pub.
	 *
	 * @param companyId the company id
	 * @param employmentcode the employmentcode
	 */
	public EmploymentCreateEventPub(String companyId, String employmentcode) {
		super();
		this.companyId = companyId;
		this.employmentcode = employmentcode;
	}
	
	
}

