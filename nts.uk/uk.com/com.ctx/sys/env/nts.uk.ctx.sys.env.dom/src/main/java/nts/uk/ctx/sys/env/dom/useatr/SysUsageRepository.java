package nts.uk.ctx.sys.env.dom.useatr;

import java.util.Optional;

public interface SysUsageRepository {
	/**
	 * get SysUsageSet
	 * @param companyId
	 * @return
	 * author: Hoang Yen
	 */
	Optional<SysUsageSet> findUsageSet(String companyId);
	/**
	 * update SysUsageSet
	 * @param SysUsageSet
	 * @return
	 * author: Hoang Yen
	 */
	void updateUsageSet(SysUsageSet sysUsageSet);  
	/**
	 * insert SysUsageSet
	 * @param SysUsageSet
	 * @return
	 * author: Hoang Yen
	 */
	void insertUsageSet(SysUsageSet sysUsageSet);
	
	void deleteUsageSet(String companyId, String companyCode, String contractCd);
}
