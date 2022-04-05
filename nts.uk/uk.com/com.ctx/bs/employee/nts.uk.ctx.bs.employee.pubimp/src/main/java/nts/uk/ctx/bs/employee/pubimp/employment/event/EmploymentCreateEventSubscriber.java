/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pubimp.employment.event;

import javax.ejb.Stateless;

import nts.arc.layer.dom.event.DomainEventSubscriber;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentCreateEvent;
import nts.uk.ctx.bs.employee.pub.employment.event.EmploymentCreateEventPub;

/**
 * The Class EmploymentCreateEventSubscriber.
 * @author NWS_HoangDD
 */
@Stateless
public class EmploymentCreateEventSubscriber implements DomainEventSubscriber<EmploymentCreateEvent>{

	/* (non-Javadoc)
	 * @see nts.arc.layer.dom.event.DomainEventSubscriber#subscribedToEventType()
	 */
	@Override
	public Class<EmploymentCreateEvent> subscribedToEventType() {
		return EmploymentCreateEvent.class;
	}

	/* (non-Javadoc)
	 * @see nts.arc.layer.dom.event.DomainEventSubscriber#handle(nts.arc.layer.dom.event.DomainEvent)
	 */
	@Override
	public void handle(EmploymentCreateEvent domainEvent) {
		EmploymentCreateEventPub p = new EmploymentCreateEventPub(domainEvent.getCompanyId().v(), domainEvent.getEmploymentcode().v());
		p.toBePublished();
	}

}

