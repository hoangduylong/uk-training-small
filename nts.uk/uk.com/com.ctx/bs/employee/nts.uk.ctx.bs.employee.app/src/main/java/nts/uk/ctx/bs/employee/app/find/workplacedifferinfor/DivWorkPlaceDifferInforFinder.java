package nts.uk.ctx.bs.employee.app.find.workplacedifferinfor;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.dom.operationrule.OperationRuleRepository;
/**
 * 
 * @author yennth
 *
 */
@Stateless
public class DivWorkPlaceDifferInforFinder {
	@Inject
	private OperationRuleRepository operationRuleRep;
	/**
	 * find a item
	 * @param companyId
	 * @param companyCode
	 * @return
	 */
	public DivWorkPlaceDifferInforDto finder(ParamFinder param){
		return this.operationRuleRep.findOperationRule(param.getCompanyId())
							.map(c -> {
								return new DivWorkPlaceDifferInforDto(param.getCompanyId(),
																	c.getDepWkpSynchAtr().value);
							}).orElse(null);
	}
}
