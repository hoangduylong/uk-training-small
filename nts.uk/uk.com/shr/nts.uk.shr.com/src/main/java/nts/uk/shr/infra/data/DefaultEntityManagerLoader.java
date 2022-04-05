package nts.uk.shr.infra.data;

import java.util.function.Consumer;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import nts.arc.layer.infra.data.EntityManagerLoader;

/**
 * DefaultEntityManagerLoader
 */
@ApplicationScoped
public class DefaultEntityManagerLoader implements EntityManagerLoader {

    @PersistenceContext(unitName = "UK")
    private EntityManager entityManager;
    
    @Override
    public EntityManager getEntityManager() {
        return this.entityManager;
    }

	@Override
	public void forAllDataSources(Consumer<EntityManager> process) {
		process.accept(entityManager);
	}

	@Override
	public void forDefaultDatasource(Consumer<EntityManager> process) {
		process.accept(entityManager);
	}

	@Override
	public void forTenantDatasource(String tenantCode, Consumer<EntityManager> process) {
		process.accept(entityManager);
	}
}
