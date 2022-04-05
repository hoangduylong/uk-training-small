/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pubimp.employee.employeeindesignated;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryRepository;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistory;
import nts.uk.ctx.bs.employee.pub.employee.employeeindesignated.EmpInDesignatedPub;
import nts.uk.ctx.bs.employee.pub.employee.employeeindesignated.EmployeeInDesignatedExport;
import nts.uk.ctx.bs.employee.pub.employment.statusemployee.StatusOfEmploymentExport;
import nts.uk.ctx.bs.employee.pub.employment.statusemployee.StatusOfEmploymentPub;

/**
 * The Class EmpInDesignatedPubImp.
 */
@Stateless
public class EmpInDesignatedPubImp implements EmpInDesignatedPub {

	/** The aff workplace history repo. */
	@Inject
	private AffWorkplaceHistoryRepository affWorkplaceHistoryRepo;

	/** The employment status pub. */
	@Inject
	private StatusOfEmploymentPub employmentStatusPub;

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.pub.employee.employeeindesignated.
	 * EmpInDesignatedPub#getEmpInDesignated(java.lang.String,
	 * nts.arc.time.GeneralDate, java.util.List)
	 */
	@Override
	public List<EmployeeInDesignatedExport> getEmpInDesignated(String workplaceId,
			GeneralDate referenceDate, List<Integer> empStatus) {

		List<AffWorkplaceHistory> affWorkplaceHistList = this.affWorkplaceHistoryRepo
				.getWorkplaceHistoryByWorkplaceIdAndDate(referenceDate, workplaceId);

		// check exist data
		if (CollectionUtil.isEmpty(affWorkplaceHistList)) {
			return Collections.emptyList();
		}

		List<String> empIdList = affWorkplaceHistList.stream()
				.map(AffWorkplaceHistory::getEmployeeId).collect(Collectors.toList());

		// Output List
		List<EmployeeInDesignatedExport> empsInDesignated = new ArrayList<>();
		//
		empIdList.stream().forEach(empId -> {
			// 在職状態を取得
			StatusOfEmploymentExport employmentStatus = this.employmentStatusPub
					.getStatusOfEmployment(empId, referenceDate);
			// check if null
			if (employmentStatus != null) {
				// Every EmpStatus Acquired from screen. Compare to empStatus
				// Acquired above
				empStatus.stream().forEach(s -> {
					if (employmentStatus.getStatusOfEmployment() == s) {
						// Add to output list
						EmployeeInDesignatedExport empExport = EmployeeInDesignatedExport.builder()
								.employeeId(empId)
								.statusOfEmp(employmentStatus.getStatusOfEmployment()).build();
						empsInDesignated.add(empExport);
					}
				});
			}
		});
		return empsInDesignated;
	}

}
