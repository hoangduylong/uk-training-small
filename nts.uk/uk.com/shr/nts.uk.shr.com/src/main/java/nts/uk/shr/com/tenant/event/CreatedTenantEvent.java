package nts.uk.shr.com.tenant.event;

import lombok.Value;
import nts.arc.layer.dom.domainevent.DomainEvent;

@Value
public class CreatedTenantEvent implements DomainEvent{
	private String contractCode; 
}
