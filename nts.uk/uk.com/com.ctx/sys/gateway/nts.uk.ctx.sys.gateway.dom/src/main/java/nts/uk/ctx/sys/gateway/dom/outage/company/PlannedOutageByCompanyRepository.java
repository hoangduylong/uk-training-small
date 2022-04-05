package nts.uk.ctx.sys.gateway.dom.outage.company;

import java.util.Optional;

public interface PlannedOutageByCompanyRepository {
	
	public void insert(PlannedOutageByCompany domain);

	public void update(PlannedOutageByCompany domain);
	
	public Optional<PlannedOutageByCompany> find(String companyId);

}
