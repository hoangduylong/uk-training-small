/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pubimp.employment.event;

import javax.ejb.Stateless;

import nts.arc.layer.dom.event.DomainEventSubscriber;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentDeleteEvent;
import nts.uk.ctx.bs.employee.pub.employment.event.EmploymentDeleteEventPub;

/**
 * The Class EmploymentDeleteEventSubscriber.
 * @author NWS_HoangDD
 */
@Stateless
public class EmploymentDeleteEventSubscriber implements DomainEventSubscriber<EmploymentDeleteEvent>{

	/* (non-Javadoc)
	 * @see nts.arc.layer.dom.event.DomainEventSubscriber#subscribedToEventType()
	 */
	@Override
	public Class<EmploymentDeleteEvent> subscribedToEventType() {
		return EmploymentDeleteEvent.class;
	}

	/* (non-Javadoc)
	 * @see nts.arc.layer.dom.event.DomainEventSubscriber#handle(nts.arc.layer.dom.event.DomainEvent)
	 */
	@Override
	public void handle(EmploymentDeleteEvent domainEvent) {
		EmploymentDeleteEventPub p = new EmploymentDeleteEventPub(domainEvent.getCompanyId().v(), domainEvent.getEmploymentcode().v());
		p.toBePublished();
		
	}

}

