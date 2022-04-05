package nts.uk.ctx.bs.employee.dom.operationrule;

import java.util.Optional;

/**
 * 
 * @author HungTT
 *
 */
public interface OperationRuleRepository {

	public Optional<OperationRule> getOperationRule(String companyId);

	/**
	 * get SysUsageSet
	 * @param companyId
	 * @return
	 */
	Optional<OperationRule> findOperationRule(String companyId);
	/**
	 * update DivWork
	 * @param SysUsageSet
	 * @return
	 */
	void update(OperationRule operationRule);
	/**
	 * insert DivWork
	 * @param SysUsageSet
	 * @return
	 */
	void insert(OperationRule operationRule);
	
	/**
	 * delete a item
	 * @param companyId
	 * @param companyCode
	 * @param contractCd
	 */
	void delete(String companyId, String companyCode, String contractCd);
}
