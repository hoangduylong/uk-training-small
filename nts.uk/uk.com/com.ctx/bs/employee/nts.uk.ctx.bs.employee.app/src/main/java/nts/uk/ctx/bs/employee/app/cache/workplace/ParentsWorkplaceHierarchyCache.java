package nts.uk.ctx.bs.employee.app.cache.workplace;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import nts.arc.layer.app.cache.DateHistoryCache;
import nts.arc.layer.app.cache.KeyDateHistoryCache;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.workplace.config.info.WorkplaceConfigInfo;
import nts.uk.ctx.bs.employee.dom.workplace.config.info.WorkplaceHierarchy;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceInformationRepository;

public class ParentsWorkplaceHierarchyCache {
	
	public static final String DOMAIN_NAME = WorkplaceConfigInfo.class.getName();
	
	private final KeyDateHistoryCache<String, List<WorkplaceHierarchy>> cache;

	public ParentsWorkplaceHierarchyCache(String companyId, WorkplaceInformationRepository repo) {
		super();
		this.cache = KeyDateHistoryCache.incremental((workplaceId, date) -> createEntries(repo, companyId, workplaceId, date));
	}
	
	public List<WorkplaceHierarchy> get(String employeeId, GeneralDate date) {
		return cache.get(employeeId, date)
				.orElse(Collections.emptyList());
	}
	
	private static Optional<DateHistoryCache.Entry<List<WorkplaceHierarchy>>> createEntries(
			WorkplaceInformationRepository repo,
			String companyId,
			String employeeId,
			GeneralDate date) {
		
		return repo.findAllParentByWkpId(companyId, date, employeeId)
				.map(conf -> new DateHistoryCache.Entry<List<WorkplaceHierarchy>>(conf.getPeriod(), conf.getLstWkpHierarchy()));
	}
	
}
