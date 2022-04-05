package nts.uk.ctx.bs.employee.app.cache.employment;

import java.util.Optional;

import nts.arc.layer.app.cache.DateHistoryCache;
import nts.arc.layer.app.cache.KeyDateHistoryCache;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentInfo;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryItemRepository;

public class EmploymentInfoCache {
	
	public static final String DOMAIN_NAME = EmploymentInfoCache.class.getName();
	
	private final KeyDateHistoryCache<String, EmploymentInfo> cache;
	
	public EmploymentInfoCache(String companyId, EmploymentHistoryItemRepository repo) {
		super();
		this.cache = KeyDateHistoryCache.incremental((empId, date) -> createEntries(repo, companyId, empId, date));
	}
	
	public Optional<EmploymentInfo> get(String empId, GeneralDate date) {
		return cache.get(empId, date);
	}
	
	private static Optional<DateHistoryCache.Entry<EmploymentInfo>> createEntries(
			EmploymentHistoryItemRepository repo,
			String companyId, 
			String employeeId,
			GeneralDate date) {
		
		return repo.getDetailEmploymentHistoryItem(companyId, employeeId, date)
				.map(conf -> new DateHistoryCache.Entry<>(conf.getPeriod(),conf));
				
	}
}
