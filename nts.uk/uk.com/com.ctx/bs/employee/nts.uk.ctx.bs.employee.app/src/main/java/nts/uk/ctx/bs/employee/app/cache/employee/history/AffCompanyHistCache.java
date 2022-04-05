package nts.uk.ctx.bs.employee.app.cache.employee.history;

import java.util.Optional;

import nts.arc.layer.app.cache.MapCache;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHist;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistRepository;

public class AffCompanyHistCache {
	public static final String DOMAIN_NAME = AffCompanyHist.class.getName();
	
	private final MapCache<String, AffCompanyHist> cache;
	
	public AffCompanyHistCache(AffCompanyHistRepository repo) {
		super();
		this.cache = MapCache.incremental(employeeId -> Optional.of(repo.getAffCompanyHistoryOfEmployee(employeeId)));
	}
	
	public AffCompanyHist get(String employeeId) {
		return cache.get(employeeId).get();
	}
}
