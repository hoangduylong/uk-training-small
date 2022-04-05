/**
 * 
 */
package nts.uk.ctx.bs.employee.pubimp.department.aff;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.department.affiliate.AffDepartmentHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.department.affiliate.AffDepartmentHistoryRepository;
import nts.uk.ctx.bs.employee.pub.department.aff.AffDepartmentPub;
import nts.uk.ctx.bs.employee.pub.department.aff.RequestList643Export;

/**
 * @author laitv
 *
 */
@Stateless
public class AffDepartmentPubImpl implements AffDepartmentPub{
	
	@Inject
	private AffDepartmentHistoryRepository affDepRepo;
	
	@Inject
	private AffDepartmentHistoryItemRepository affDepItemRepo;

	@Override
	public List<RequestList643Export> getAffDeptHistByEmpIdAndBaseDate(List<String> sids, GeneralDate baseDate) {
		
		List<Object[]> listObj = affDepRepo.getAffDeptHistByEmpIdAndBaseDate(sids, baseDate);
		
		if (CollectionUtil.isEmpty(listObj)) {
			return new ArrayList<>();
		}
		
		List<RequestList643Export> result = new ArrayList<RequestList643Export>();

		for (int i = 0; i < listObj.size(); i++) {
			RequestList643Export depInfo = new RequestList643Export();
			depInfo.setEmployeeId(listObj.get(i)[0] == null ? "" : listObj.get(i)[0].toString());
			depInfo.setDepartmentId(listObj.get(i)[1] == null ? "" : listObj.get(i)[1].toString());
			result.add(depInfo);
		}
		return result;
	}

	@Override
	public List<RequestList643Export> getAffDepartmentHistoryItems(List<String> departmentIDs, GeneralDate baseDate) {
		return affDepItemRepo.getAffDepartmentHistoryItems(departmentIDs, baseDate).stream().map(c-> new RequestList643Export(c.getEmployeeId(), c.getDepartmentId())).collect(Collectors.toList());
	}

}
