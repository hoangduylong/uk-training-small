package nts.uk.ctx.bs.employee.app.cache.employee.mgndata;

import java.util.Optional;

import nts.arc.layer.app.cache.MapCache;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfo;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfoRepository;

public class EmployeeDataMngInfoCache {
	public static final String DOMAIN_NAME = EmployeeDataMngInfoCache.class.getName();
	
	private final MapCache<String, EmployeeDataMngInfo> cache;
	
	public EmployeeDataMngInfoCache(EmployeeDataMngInfoRepository repo) {
		this.cache = MapCache.incremental(employeeId -> repo.findByEmpId(employeeId));
	}
	
	public Optional<EmployeeDataMngInfo> get(String employeeId) {
		return cache.get(employeeId);
	}
}
