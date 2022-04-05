package nts.uk.ctx.bs.employee.app.cache.workplace;

import java.util.List;

import nts.arc.layer.app.cache.KeyDateHistoryCache;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryItem;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryItemRepository;

public class AffWorkplaceHistoryItemCache {

	public static final String DOMAIN_NAME = AffWorkplaceHistoryItem.class.getName();
	
//	private final KeyDateHistoryCache<String, List<AffWorkplaceHistoryItem>> cache;
//	
//	public AffWorkplaceHistoryItemCache(AffWorkplaceHistoryItemRepository repo,
//										String employeeId,
//										GeneralDate basedate) {
//		super();
//		this.cache = KeyDateHistoryCache.incremental(
//				(empId,date) ->
//				empId,
//				date,
//				repo.getAffWrkplaHistItemByEmpIdAndDate(basedate, employeeId)
//				);
//	}
}
