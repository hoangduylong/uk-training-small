package nts.uk.ctx.bs.company.app.cache;

import java.util.Optional;

import nts.arc.layer.app.cache.MapCache;
import nts.uk.ctx.bs.company.dom.company.Company;
import nts.uk.ctx.bs.company.dom.company.CompanyRepository;

public class CompanyCache {

	public static final String DOMAIN_NAME = Company.class.getName();
	
	private final MapCache<String, Company> cache;
	
	public CompanyCache(CompanyRepository repo) {
		this.cache = MapCache.incremental(companyId -> repo.getComanyInfoByCid(companyId));
	}
	
	public Optional<Company> get(String companyId){
		return cache.get(companyId);
	}
}
