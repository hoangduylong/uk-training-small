package nts.uk.ctx.sys.gateway.dom.outage.tenant;

import java.util.Optional;

public interface PlannedOutageByTenantRepository {
	
	public void insert(PlannedOutageByTenant domain);

	public void update(PlannedOutageByTenant domain);
	
	public Optional<PlannedOutageByTenant> find(String tenantCode);

}
