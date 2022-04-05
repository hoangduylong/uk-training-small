/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.wkpmanager;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.adapter.workplace.AffWorkplaceHistImport;
import nts.uk.ctx.sys.auth.dom.adapter.workplace.SysAuthWorkplaceAdapter;
import nts.uk.ctx.sys.auth.dom.adapter.workplace.WorkplaceAdapter;
import nts.uk.ctx.sys.auth.dom.adapter.workplace.WorkplaceInfoImport;
import nts.uk.ctx.sys.auth.dom.role.EmployeeReferenceRange;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class WorkPlaceService.
 */
@Stateless
public class WorkPlaceManageService {

	/** The workplace adapter. */
	@Inject
	private WorkplaceAdapter workplaceAdapter;
	
	/** The workplace manager repository. */
//	@Inject
//	private WorkplaceManagerRepository workplaceManagerRepository;
	
	@Inject
	private SysAuthWorkplaceAdapter sysAuthWorkplaceAdapter;
	
	/**
	 * Find list workplace id.
	 *
	 * @param baseDate the base date
	 * @param referenceRange the reference range
	 * @return the list
	 */
	public List<String> findListWorkplaceId(GeneralDate baseDate, Integer referenceRange) {
		String companyId = AppContexts.user().companyId();
		List<String> listWkpId = new ArrayList<>();
		//check ReferenceRange 
		if (referenceRange == EmployeeReferenceRange.ALL_EMPLOYEE.value) {
			//get list WorkplaceId by WorkplaceAdapter
	//		listWkpId = workplaceAdapter.findListWkpIdByBaseDate(baseDate);
			listWkpId = sysAuthWorkplaceAdapter.getAllActiveWorkplaceInfo(companyId, baseDate)
					.stream().map(WorkplaceInfoImport::getWorkplaceId).collect(Collectors.toList());
		} else {
			//get list WorkplaceId by function findListWkpId
			listWkpId = this.findListWkpId(baseDate, referenceRange);
		}
		return listWkpId;

	}
	
	/**
	 * Find list wkp id.
	 *
	 * @param baseDate the base date
	 * @param referenceRange the reference range
	 * @return the list
	 */
//	private List<String> findListWkpId(GeneralDate baseDate, Integer referenceRange) {
//		List<String> listWkpId = new ArrayList<>();
//
//		String workplaceId = "";
//		String employeeId = AppContexts.user().employeeId();
//		String companyId = AppContexts.user().companyId();
//		
//		// get workplace manager 
//		List<WorkplaceManager> listWkpManager = workplaceManagerRepository.findListWkpManagerByEmpIdAndBaseDate(employeeId, baseDate);
//		
//		// add wkpId to listWkpId
//		listWkpId = listWkpManager.stream().map(m -> m.getWorkplaceId()).collect(Collectors.toList());
//				
//		// requestList #30 get aff workplace history
//		Optional<AffWorkplaceHistImport> opAffWorkplaceHistImport = workplaceAdapter
//				.findWkpByBaseDateAndEmployeeId(baseDate, employeeId);
//
//		// add wkpId to listWkpId
//		if (opAffWorkplaceHistImport.isPresent()) {
//			workplaceId = opAffWorkplaceHistImport.get().getWorkplaceId();
//		}
//
//		// check workplace id != null
//		if (workplaceId != null) {
//			listWkpId.add(workplaceId);
//		}
//
//		// action RequestList #154
//		if (referenceRange == EmployeeReferenceRange.DEPARTMENT_AND_CHILD.value && workplaceId != null) {
//			List<String> list = workplaceAdapter.findListWorkplaceIdByCidAndWkpIdAndBaseDate(companyId, workplaceId, baseDate);
//			listWkpId.addAll(list);
//		}
//
//		return listWkpId.stream().distinct().collect(Collectors.toList());
//	}
	
	/**
	 * Find list wkp id.
	 *
	 * @param param the param
	 * @return the list
	 */
	public List<String> findListWkpId(GeneralDate baseDate, Integer referenceRange) {

		String workplaceId = "";
		String employeeId = AppContexts.user().employeeId();
		String companyId = AppContexts.user().companyId();
		
		//[RQ613]指定社員の職場管理者の職場リストを取得する（配下含む）
		List<String> listWkpId = workplaceAdapter.getWorkplaceId(GeneralDate.today(), employeeId);
				
		// requestList #30 get aff workplace history
//		Optional<AffWorkplaceHistImport> opAffWorkplaceHistImport = workplaceAdapter
//				.findWkpByBaseDateAndEmployeeId(param.getBaseDate(), employeeId);

		// Including management workplace = false

		// RequestList No.30 get aff workplace history
		Optional<AffWorkplaceHistImport> optAffWorkplaceHistImport = sysAuthWorkplaceAdapter
				.findWkpByBaseDateAndEmpId(baseDate, employeeId);

		if (optAffWorkplaceHistImport.isPresent()) {
			workplaceId = optAffWorkplaceHistImport.get().getWorkplaceId();
		}

        // check workplace id != null
        if (workplaceId != null) {
            listWkpId.add(workplaceId);
        }

		// [No.567] 職場の下位職場を取得する
		if (referenceRange == EmployeeReferenceRange.DEPARTMENT_AND_CHILD.value && !workplaceId.isEmpty()) {
			List<String> wkpIds = sysAuthWorkplaceAdapter.getAllChildrenOfWorkplaceId(companyId, baseDate, workplaceId);
			listWkpId.addAll(wkpIds);
		}

		return listWkpId.stream().distinct().collect(Collectors.toList());
	}
}
