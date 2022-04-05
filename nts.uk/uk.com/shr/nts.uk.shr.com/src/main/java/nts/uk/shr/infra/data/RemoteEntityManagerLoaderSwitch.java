package nts.uk.shr.infra.data;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import nts.arc.layer.infra.data.EntityManagerLoader;
import nts.arc.layer.infra.data.EntityManagerLoaderSwitch;
import nts.uk.shr.com.system.property.UKServerSystemProperties;

@ApplicationScoped
public class RemoteEntityManagerLoaderSwitch implements EntityManagerLoaderSwitch{
	
	@Inject
	private DefaultEntityManagerLoader defaultEntityManager;
	
	@Inject
	private CloudEntityManagerLoader cloudEntityManager;
	
	private boolean useTenantLocator = false;

	@PostConstruct
	public void useTenantLocator() {
		this.useTenantLocator = UKServerSystemProperties.usesTenantLocator();
	}
	
	@Override
	public EntityManagerLoader get() {
		if(useTenantLocator) {
			return cloudEntityManager;
		}
		return defaultEntityManager;
	}
}
