/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.employee.employeeindesignated;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHist;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistByEmployee;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistItem;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistRepository;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfo;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfoRepository;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsItemRepository;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHisItem;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.state.LeaveHolidayType;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistory;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryItem;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryRepository;
import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfo;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceInformationRepository;
import nts.uk.ctx.bs.person.dom.person.info.Person;
import nts.uk.ctx.bs.person.dom.person.info.PersonRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class EmployeeInDesignatedFinder.
 */
@Stateless
public class EmployeeInDesignatedFinder {

	/** The aff workplace history repo ver 1. */
	@Inject
	private AffWorkplaceHistoryRepository affWorkplaceHistoryRepo;
	
	/** The aff workplace history item repo v 1. */
	@Inject
	private AffWorkplaceHistoryItemRepository affWorkplaceHistoryItemRepo;
	
	/** The employee data repo. */
	@Inject
	private EmployeeDataMngInfoRepository employeeDataRepo;
	
	/** The aff company hist repo. */
	@Inject
	private AffCompanyHistRepository affCompanyHistRepo;

	/** The temporary absence repo. */
	@Inject
	private TempAbsItemRepository temporaryAbsenceItemRepo;
	
	/** The workplace info repo. */
	@Inject
	private WorkplaceInformationRepository workplaceInfoRepo;

	/** The person repo. */
	@Inject
	private PersonRepository personRepo;

	/**
	 * Search emp by workplace list.
	 *
	 * @param input
	 *            the input
	 * @return the list
	 */
	public List<EmployeeSearchOutput> searchEmpByWorkplaceList(SearchEmpInput input) {
		// Check empty for List Employee Status acquired from screen
		if (CollectionUtil.isEmpty(input.getEmpStatus())) {
			return Collections.emptyList();
		}
		// List Output
		List<EmployeeSearchOutput> outputData = new ArrayList<>();

		// Workplace Id List (Input), get Employees In Designated (Employee with Status)
		List<EmployeeInDesignatedDto> empListInDesignated = this.getEmpInDesignated(input.getWorkplaceIdList(),
				input.getReferenceDate(), input.getEmpStatus());
		
		// Check isEmpty of Employee In Designated List
		if (CollectionUtil.isEmpty(empListInDesignated)) {
			return Collections.emptyList();
		}
		
		// Employee Id List from Employees In Designated
		List<String> empIdList = empListInDesignated.stream().map(EmployeeInDesignatedDto::getEmployeeId)
				.collect(Collectors.toList());

		// Get All Employee Domain from Employee Id List Above
		List<EmployeeDataMngInfo> employeeList = employeeDataRepo.findByListEmployeeId(AppContexts.user().companyId(), empIdList);
		
		// Get PersonIds from Employee List acquired above
		List<String> personIds = employeeList.stream().map(EmployeeDataMngInfo::getPersonId).collect(Collectors.toList());
		// Get All Person Domain from PersonIds above
		List<Person> personList = this.personRepo.getPersonByPersonIds(personIds);
		
		Map<String, Person> personMap = personList.parallelStream().collect(Collectors.toMap(Person::getPersonId, Function.identity()));

		List<AffWorkplaceHistoryItem> affWkpHistItems = 
				this.affWorkplaceHistoryItemRepo.getAffWrkplaHistItemByListEmpIdAndDate(input.getReferenceDate(), empIdList);
		
		Map<String, String> affWkpHistItemMap = affWkpHistItems.parallelStream()
				.collect(Collectors.toMap(AffWorkplaceHistoryItem::getEmployeeId,
						AffWorkplaceHistoryItem::getWorkplaceId));
		
		if (CollectionUtil.isEmpty(affWkpHistItems)) {
			return Collections.emptyList();
		}
		
		// List WorkplaceInfo
		List<WorkplaceInfo> workplaceInfoList = this.workplaceInfoRepo.findByWkpIds(input.getWorkplaceIdList());
		
		Map<String, WorkplaceInfo> workplaceInfoMap = workplaceInfoList.parallelStream().collect(Collectors.toMap(WorkplaceInfo::getWorkplaceId, Function.identity()));
					
		// Add Employee Data
		employeeList.stream().forEach(employeeInfo -> {
			// Get Person by personId
			Person person = personMap.get(employeeInfo.getPersonId());

			String workplaceId =  affWkpHistItemMap.get(employeeInfo.getEmployeeId());
			
			// Get WorkplaceInfo
			WorkplaceInfo wkpInfo = workplaceInfoMap.get(workplaceId);

			// Employee Data 
			EmployeeSearchOutput empData = EmployeeSearchOutput.builder().employeeId(employeeInfo.getEmployeeId())
					.employeeCode((employeeInfo.getEmployeeCode() == null) ? null : employeeInfo.getEmployeeCode().v())
					.employeeName((person == null || person.getPersonNameGroup() == null
							|| (person.getPersonNameGroup().getBusinessName() == null)) ? null
									: person.getPersonNameGroup().getBusinessName().v())
					.workplaceId(wkpInfo == null || (wkpInfo.getWorkplaceId() == null) ? null
							: wkpInfo.getWorkplaceId())
					.workplaceCode((wkpInfo == null) || (wkpInfo.getWorkplaceCode() == null) ? null
							: wkpInfo.getWorkplaceCode().v())
					.workplaceName((wkpInfo == null) || (wkpInfo.getWorkplaceName() == null) ? null
							: wkpInfo.getWorkplaceName().v())
					.build();

			// Add Employee to output Data
			outputData.add(empData);
		});

		return outputData;
	}

	/**
	 * Gets the emp in designated.
	 *
	 * @param workplaceId the workplace id
	 * @param referenceDate the reference date
	 * @param empStatus the emp status
	 * @return the emp in designated
	 */
	public List<EmployeeInDesignatedDto> getEmpInDesignated(List<String> workplaceIds, GeneralDate referenceDate,
			List<Integer> empStatus) {
		
		List<AffWorkplaceHistory> affWorkplaceHistList = this.affWorkplaceHistoryRepo.getWorkplaceHistoryByWkpIdsAndDate(referenceDate, workplaceIds);
		
		// check exist data
		if (CollectionUtil.isEmpty(affWorkplaceHistList)) {
			Collections.emptyList();
		}
		// Get List of Employee Id
		List<String> empIdList = affWorkplaceHistList.parallelStream().map(AffWorkplaceHistory::getEmployeeId)
				.collect(Collectors.toList());
		
		// Output List
		List<EmploymentStatusDto> employmentStatus =  this.getStatusOfEmployments(empIdList,
				referenceDate);
		
//		List<String> empIds = employmentStatus.stream().map(EmploymentStatusDto::getEmployeeId).collect(Collectors.toList());
		
		Map<String, EmploymentStatusDto> empStatusMap = employmentStatus.parallelStream()
				.collect(Collectors.toMap(EmploymentStatusDto::getEmployeeId, Function.identity()));

		// TODO: Solution for temporary case: can't get Status of Employment is
		// in proportion to empId
		List<String> empIdWithSttList = employmentStatus.stream()
				.map(EmploymentStatusDto::getEmployeeId).collect(Collectors.toList());
		// End of solution (replace empIdList by newEmpIdList. As below)

		return empIdWithSttList.stream().map(empId -> {
			// Initialize EmployeeInDesignatedDto
			EmployeeInDesignatedDto empInDes = EmployeeInDesignatedDto.builder().build();
			EmploymentStatusDto empStatusOfMap = empStatusMap.get(empId);
			// check if null
			if (empStatus != null) {
				// Every EmpStatus Acquired from screen. Compare to empStatus
				// Acquired above
				empStatus.stream().forEach(s -> {
					if (empStatusOfMap.getStatusOfEmployment() == s) {
						// Set EmployeeInDesignatedDto
						empInDes.setEmployeeId(empId);
						empInDes.setStatusOfEmp(empStatusOfMap.getStatusOfEmployment());
					}
				});
			}
			return empInDes;
		}).collect(Collectors.toList());
		
	}

	/**
	 * Gets the status of employment.
	 *
	 * @param employeeId
	 *            the employee id
	 * @param referenceDate
	 *            the reference date
	 * @return the status of employment
	 */
	public List<EmploymentStatusDto> getStatusOfEmployments(List<String> employeeIds, GeneralDate referenceDate) {
		// Get Domain [所属会社履歴 （社員別）]
		List<AffCompanyHist> affCompanyHistList = this.affCompanyHistRepo.getAffCompanyHistoryOfEmployees(employeeIds);

		if (CollectionUtil.isEmpty(affCompanyHistList)) {
			return Collections.emptyList();
		}
		// List AffCompanyHistByEmployee
		List<AffCompanyHistByEmployee> affComHistByEmpList = new ArrayList<>();
		affCompanyHistList.stream().forEach(affComHist -> {
			AffCompanyHistByEmployee histByEmp = affComHist.getLstAffCompanyHistByEmployee().get(0);
			affComHistByEmpList.add(histByEmp);
		});
		
		// Get "TempAbsenceHistory", "TempAbsenceHisItem"
		List<TempAbsenceHisItem> tempAbsItems = temporaryAbsenceItemRepo
				.getByEmpIdsAndStandardDate(employeeIds, referenceDate);
		
		Map<String, TempAbsenceHisItem> mapTempAbsItems = tempAbsItems.parallelStream()
				.collect(Collectors.toMap(TempAbsenceHisItem::getEmployeeId, Function.identity()));
		
		// Convert to dto
		return affComHistByEmpList.parallelStream().map(affComHistByEmp -> {
			EmploymentStatusDto statusOfEmploymentExport = new EmploymentStatusDto();
			statusOfEmploymentExport.setEmployeeId(affComHistByEmp.getSId());
			statusOfEmploymentExport.setRefereneDate(referenceDate);

			// Get List AffCompanyHistItem
			List<AffCompanyHistItem> affCompanyHistItem = affComHistByEmp.getLstAffCompanyHistoryItem();

			// TODO: Solution for a Temporary Case (DB is unavailable: List of AffCompanyHistItem is empty)
			if (CollectionUtil.isEmpty(affCompanyHistItem)) {
				statusOfEmploymentExport.setStatusOfEmployment(StatusOfEmployment.BEFORE_JOINING.value);
				return statusOfEmploymentExport;
				// throw new RuntimeException("Data is invalid. Please check again!");
			}
			// End of Solution
			// Filter Condition: 履歴．期間．開始日 <= パラメータ．基準日 <= 履歴．期間．終了日の「履歴」が存在する場合
			List<AffCompanyHistItem> filteredAffComHistItem = affCompanyHistItem.stream().filter(h -> {
				return h.getDatePeriod().start().beforeOrEquals(referenceDate)
						&& h.getDatePeriod().end().afterOrEquals(referenceDate);
			}).collect(Collectors.toList());

			if (filteredAffComHistItem.isEmpty()) { // Case: Filtered AffComHistItemList 
				// (Condition: History.Period.StartDate <= BaseDate <= History.Period.Endate) is empty

				// AffComHistItemList List (Condition: History.Period.StartDate < BaseDate)
				List<AffCompanyHistItem> histBeforeBaseDate = affCompanyHistItem.stream().filter(item -> {
					return item.getDatePeriod().start().before(referenceDate);
				}).collect(Collectors.toList());

				if (CollectionUtil.isEmpty(histBeforeBaseDate)) {
					// StatusOfEmployment = BEFORE_JOINING
					statusOfEmploymentExport.setStatusOfEmployment(StatusOfEmployment.BEFORE_JOINING.value);
				} else {
					// StatusOfEmployment = RETIREMENT
					statusOfEmploymentExport.setStatusOfEmployment(StatusOfEmployment.RETIREMENT.value);
				}

			} else {// Case: Filtered ListEntryJobHist 
				// (Condition: History.Period.StartDate <= BaseDate <= History.Period.Endate) is not empty
				if (mapTempAbsItems.get(affComHistByEmp.getSId()) != null) {
					// Domain TempAbsenceHisItem is Present

					int tempAbsFrNo = mapTempAbsItems.get(affComHistByEmp.getSId()).getTempAbsenceFrNo().v().intValue();
					int tempAbsenceType = tempAbsFrNo <= 6 ? tempAbsFrNo : 7;
					// Set LeaveHolidayType to statusOfEmploymentExport
					statusOfEmploymentExport.setLeaveHolidayType(tempAbsenceType);

					// Check 休職休業区分＝休職? : LeaveHolidayType(TempAbsenceFrameNo) == LEAVE_OF_ABSENCE
					if (tempAbsenceType == LeaveHolidayType.LEAVE_OF_ABSENCE.value) {
						// StatusOfEmployment = LEAVE_OF_ABSENCE (在籍状態＝休職)
						statusOfEmploymentExport.setStatusOfEmployment(StatusOfEmployment.LEAVE_OF_ABSENCE.value);
					} else {
						// StatusOfEmployment = HOLIDAY (在籍状態＝休業)
						statusOfEmploymentExport.setStatusOfEmployment(StatusOfEmployment.HOLIDAY.value);
					}
				} else {
					// StatusOfEmployment = INCUMBENT (在籍状態＝在籍)
					statusOfEmploymentExport.setStatusOfEmployment(StatusOfEmployment.INCUMBENT.value);
				}
			}
			return statusOfEmploymentExport;
		}).distinct().collect(Collectors.toList());

	}

}
