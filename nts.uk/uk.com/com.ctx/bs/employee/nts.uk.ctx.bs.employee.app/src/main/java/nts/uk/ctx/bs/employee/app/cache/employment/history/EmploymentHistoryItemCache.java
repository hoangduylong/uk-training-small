package nts.uk.ctx.bs.employee.app.cache.employment.history;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.val;
import nts.arc.layer.app.cache.DateHistoryCache;
import nts.arc.layer.app.cache.KeyDateHistoryCache;
import nts.arc.layer.app.cache.MapCache;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryItem;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryRepository;
import nts.uk.shr.com.history.DateHistoryItem;

public class EmploymentHistoryItemCache {

	public static final String DOMAIN_NAME = EmploymentHistoryItem.class.getName();
	
//	private final KeyDateHistoryCache<String, EmploymentHistoryItem.WithPeriod> cache;
	
//	public EmploymentHistoryItemCache(
//			EmploymentHistoryRepository historyRepo,
//			EmploymentHistoryItemRepository itemRepo,
//			List<String> ) {
//		super();
//		
//		this.cache = KeyDateHistoryCache.incremental((String employeeId, GeneralDate date) -> {
//			return historyRepo.getByEmployeeIdAndStandardDate(employeeId, date)
//					.flatMap(histItem -> {
//						return itemRepo.getByHistoryId(histItem.identifier())
//								.map(item -> item.with(histItem.span()));
//					})
//					.map(w -> DateHistoryCache.Entry.of(w.getPeriod(), w));
//		});
//	}
//	
//	public List<EmploymentHistoryItem> get(List<String> histId){
//		return histId.stream()
//				.map(id -> cache.get(id).get())
//				.collect(Collectors.toList());
//	}
}
