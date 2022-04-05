package nts.uk.ctx.bs.employee.app.cache.employee.history;

import java.util.Optional;

import nts.arc.layer.app.cache.DateHistoryCache;
import nts.arc.layer.app.cache.KeyDateHistoryCache;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryRepository;
import nts.uk.shr.com.history.DateHistoryItem;

public class DateHistoryItemCache {
	public static final String DOMAIN_NAME = DateHistoryItem.class.getName();
	
	private final KeyDateHistoryCache<String, DateHistoryItem> cache;

	
	public DateHistoryItemCache(EmploymentHistoryRepository repo) {
		super();
		this.cache = KeyDateHistoryCache.incremental((employeeId, date)
				-> createEntries(repo, employeeId, date));
	}
	
	public Optional<DateHistoryItem> get(String employeeId, GeneralDate date) {
		return cache.get(employeeId, date);
	}
	
	private static Optional<DateHistoryCache.Entry<DateHistoryItem>> createEntries(
			EmploymentHistoryRepository repo,
			String employeeId,
			GeneralDate date){
		return repo.getByEmployeeIdAndStandardDate(employeeId, date)
				.map(conf -> new DateHistoryCache.Entry<DateHistoryItem>(conf.span(), conf));
	}
}
