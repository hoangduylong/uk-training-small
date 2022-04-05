package nts.uk.shr.infra.logcollector.dom;

import java.util.List;

public interface LogAccessInfoRepository {
	
	List<LogAccessInfo> getAll();
	
	List<LogAccessInfo> getByHost(List<String> hosts);
	
	List<LogAccessInfo> getByDomains(List<String> domains);
	
	List<LogAccessInfo> getBy(List<String> domains, List<String> hosts);
}
