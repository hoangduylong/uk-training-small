/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.query.employee;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.time.GeneralDate;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.access.person.SyPersonAdapter;
import nts.uk.ctx.bs.employee.dom.access.person.dto.PersonImport;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistItem;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistItemRepository;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfo;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfoRepository;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDeletionAttr;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryItem;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistory;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfo;
import nts.uk.ctx.bs.employee.dom.jobtitle.info.JobTitleInfoRepository;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryItem;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryRepository;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistory;
import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfo;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceInformationRepository;
import nts.uk.ctx.bs.employee.dom.workplace.master.service.WorkplaceExportService;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;

/**
 * The Class EmployeeQueryProcessor.
 */
@Stateless
public class EmployeeSearchQueryProcessor {
	/** The person repository. */
	@Inject
	private SyPersonAdapter personAdapter;

	/** The workplace repository. */
	@Inject
	private WorkplaceInformationRepository workplaceConfigInfoRepo;
	
	@Inject
	private WorkplaceExportService wkpExpService;

	/** The job title repository. */
	@Inject
	private JobTitleInfoRepository jobTitleInfoRepo;

	/** The employee repository. */
	@Inject
	private EmployeeDataMngInfoRepository employeeRepository;

	/** The employment history repository. */
	@Inject
	private EmploymentHistoryItemRepository employmentHistoryRepository;

	/** The classification history repository. */
	@Inject
	private AffClassHistItemRepository classificationHistoryRepository;

	/** The job title history repository. */
	@Inject
	private AffJobTitleHistoryRepository jobTitleHistoryRepository;
	
	@Inject
	private AffJobTitleHistoryItemRepository affJobTitleHistoryItemRepository;

	/** The workplace history repository. */
	@Inject
	private AffWorkplaceHistoryRepository workplaceHistoryRepository;

	/** The item repository. */
	@Inject
	private AffWorkplaceHistoryItemRepository affWorkplaceHistoryItemRepository;

	/**
	 * To employee.
	 *
	 * @param baseDate
	 *            the base date
	 * @param employeeIds
	 *            the employee ids
	 * @param companyId
	 *            the company id
	 * @return the list
	 */

	public List<EmployeeSearchData> toEmployee(GeneralDate baseDate, List<String> employeeIds,
			String companyId) {

		// get employee list
		List<EmployeeDataMngInfo> employeeDatas = this.employeeRepository
				.findByListEmployeeId(companyId, employeeIds);

		// check exist employee
		if (CollectionUtil.isEmpty(employeeDatas)) {
			throw new BusinessException("Msg_317");
		}

		// Filter by state
		employeeDatas = employeeDatas.stream().filter(item -> {
			return EmployeeDeletionAttr.NOTDELETED.value == item.getDeletedStatus().value;
		}).collect(Collectors.toList());

		// get work place history by employee
		List<AffWorkplaceHistory> workplaceHistory = this.workplaceHistoryRepository
				.findByEmployees(employeeIds, baseDate);

		// check exist data work place
		if (CollectionUtil.isEmpty(workplaceHistory)) {
			throw new BusinessException("Msg_177");
		}

		// get all work place of company
		List<WorkplaceInfo> workplaces = this.workplaceConfigInfoRepo.findAll(companyId, baseDate);

		// to map work place
		Map<String, WorkplaceInfo> workplaceMap = workplaces.stream()
				.collect(Collectors.toMap((workplace) -> {
					return workplace.getWorkplaceId();
				}, Function.identity()));

		// to map work place history
		Map<String, AffWorkplaceHistory> workplaceHistoryMap = workplaceHistory.stream()
				.collect(Collectors.toMap((workplace) -> {
					return workplace.getEmployeeId();
				}, Function.identity()));

		// get person name
		List<PersonImport> persons = this.personAdapter.findByPersonIds(employeeDatas.stream()
				.map(employee -> employee.getPersonId()).collect(Collectors.toList()));

		// to map person (person id)
		Map<String, PersonImport> personMap = persons.stream()
				.collect(Collectors.toMap((person) -> {
					return person.getPersonId();
				}, Function.identity()));

		List<EmployeeSearchData> employeeSearchData = new ArrayList<>();

		employeeDatas.forEach(employee -> {
			// check exist data
			if (workplaceHistoryMap.containsKey(employee.getEmployeeId())
					&& personMap.containsKey(employee.getPersonId())) {

				// Find
				String wplId = this.affWorkplaceHistoryItemRepository
						.getByHistId(workplaceHistoryMap.get(employee.getEmployeeId())
								.getHistoryItems().get(0).identifier())
						.get().getWorkplaceId();
				// If worplace is not found.
				if (workplaceMap.get(wplId) == null) {
					return;
				}
				// add to dto
				EmployeeSearchData dto = new EmployeeSearchData();
				dto.setEmployeeId(employee.getEmployeeId());
				dto.setEmployeeCode(employee.getEmployeeCode().v());
				dto.setEmployeeName(personMap.get(employee.getPersonId()).getBusinessName());
				dto.setWorkplaceId(wplId);

				dto.setWorkplaceCode(workplaceMap.get(dto.getWorkplaceId()).getWorkplaceCode().v());
				dto.setWorkplaceName(workplaceMap.get(dto.getWorkplaceId()).getWorkplaceName().v());
				employeeSearchData.add(dto);
			}
		});

		// check exist data employee search
		if (CollectionUtil.isEmpty(employeeSearchData)) {
			throw new BusinessException("Msg_176");
		}

		return employeeSearchData;
	}
	
	public List<EmployeeSearchData> toEmployeeNew(GeneralDate baseDate, List<String> employeeIds,
			String companyId) {

		// get employee list
		List<EmployeeDataMngInfo> employeeDatas = this.employeeRepository
				.findByListEmployeeId(companyId, employeeIds);

		// check exist employee
		if (CollectionUtil.isEmpty(employeeDatas)) {
			throw new BusinessException("Msg_317");
		}

		// get work place history by employee
		List<AffWorkplaceHistory> workplaceHistory = this.workplaceHistoryRepository
				.findByEmployees(employeeIds, baseDate);

		// get all work place of company
		List<WorkplaceInfo> workplaces = this.workplaceConfigInfoRepo.findAll(companyId, baseDate);

		// to map work place
		Map<String, WorkplaceInfo> workplaceMap = workplaces.stream()
				.collect(Collectors.toMap((workplace) -> {
					return workplace.getWorkplaceId();
				}, Function.identity()));

		// to map work place history
		Map<String, AffWorkplaceHistory> workplaceHistoryMap = workplaceHistory.stream()
				.collect(Collectors.toMap((workplace) -> {
					return workplace.getEmployeeId();
				}, Function.identity()));

		// get person name
		List<PersonImport> persons = this.personAdapter.findByPersonIds(employeeDatas.stream()
				.map(employee -> employee.getPersonId()).collect(Collectors.toList()));

		// to map person (person id)
		Map<String, PersonImport> personMap = persons.stream()
				.collect(Collectors.toMap((person) -> {
					return person.getPersonId();
				}, Function.identity()));

		List<EmployeeSearchData> employeeSearchData = new ArrayList<>();

		employeeDatas.forEach(employee -> {
			// check exist data
			if (workplaceHistoryMap.containsKey(employee.getEmployeeId())
					&& personMap.containsKey(employee.getPersonId())) {

				// Find
				String wplId = this.affWorkplaceHistoryItemRepository
						.getByHistId(workplaceHistoryMap.get(employee.getEmployeeId())
								.getHistoryItems().get(0).identifier())
						.get().getWorkplaceId();
				// If worplace is not found.
				if (workplaceMap.get(wplId) == null) {
					return;
				}
				// add to dto
				EmployeeSearchData dto = new EmployeeSearchData();
				dto.setEmployeeId(employee.getEmployeeId());
				dto.setEmployeeCode(employee.getEmployeeCode().v());
				dto.setEmployeeName(personMap.get(employee.getPersonId()).getBusinessName());
				dto.setWorkplaceId(wplId);

				dto.setWorkplaceCode(workplaceMap.get(dto.getWorkplaceId()).getWorkplaceCode().v());
				dto.setWorkplaceName(workplaceMap.get(dto.getWorkplaceId()).getWorkplaceName().v());
				employeeSearchData.add(dto);
			}
		});

		// check exist data employee search
		if (CollectionUtil.isEmpty(employeeSearchData)) {
			throw new BusinessException("Msg_317");
		}

		return employeeSearchData;
	}

	/**
	 * Search all employee.
	 *
	 * @param baseDate
	 *            the base date
	 * @return the list
	 */
	public List<EmployeeSearchData> searchAllEmployee(GeneralDate baseDate) {

		// get login user
		LoginUserContext loginUserContext = AppContexts.user();

		// get company id
		String companyId = loginUserContext.companyId();

		// get all employee data of company id
		List<EmployeeDataMngInfo> employeeDatas = this.employeeRepository
				.findByCompanyId(companyId);

		return toEmployee(baseDate, employeeDatas.stream().map(employee -> employee.getEmployeeId())
				.collect(Collectors.toList()), companyId);
	}

	/**
	 * Search all employee.
	 *
	 * @param baseDate
	 *            the base date
	 * @return the list
	 */
	public List<EmployeeSearchData> searchEmployeeByLogin(GeneralDate baseDate) {

		// get login user
		LoginUserContext loginUserContext = AppContexts.user();

		// get company id
		String companyId = loginUserContext.companyId();

		// get employee id
		String employeeId = loginUserContext.employeeId();

		// add employeeId
		List<String> employeeIds = new ArrayList<>();

		employeeIds.add(employeeId);

		// get data
		return toEmployee(baseDate, employeeIds, companyId);
	}
	
	public List<EmployeeSearchData> searchOnlyEmployeeByLogin(GeneralDate baseDate) {

		// get login user
		LoginUserContext loginUserContext = AppContexts.user();

		// get company id
		String companyId = loginUserContext.companyId();

		// get employee id
		String employeeId = loginUserContext.employeeId();

		// add employeeId
		List<String> employeeIds = new ArrayList<>();

		employeeIds.add(employeeId);

		// get data
		return toEmployeeNew(baseDate, employeeIds, companyId);
	}

	/**
	 * Search mode employee.
	 *
	 * @param input
	 *            the input
	 * @return the list
	 */
	public List<EmployeeSearchData> searchModeEmployee(EmployeeSearchQuery input) {
		// get login user
		LoginUserContext loginUserContext = AppContexts.user();

		// get company id
		String companyId = loginUserContext.companyId();

		// find by employment
		List<EmploymentHistoryItem> empHistories = this.employmentHistoryRepository
				.searchEmployee(input.getBaseDate(), input.getEmploymentCodes());

		// find by classification
		List<AffClassHistItem> clsHistories = this.classificationHistoryRepository
				.searchClassification(
						empHistories.stream().map(employment -> employment.getEmployeeId())
								.collect(Collectors.toList()),
						input.getBaseDate(), input.getClassificationCodes());

		// find by job title
		List<AffJobTitleHistory> jobHistories = this.jobTitleHistoryRepository
				.searchJobTitleHistory(
						input.getBaseDate(), clsHistories.stream()
								.map(AffClassHistItem::getEmployeeId).collect(Collectors.toList()),
						input.getJobTitleCodes());

		// find by work place
		List<AffWorkplaceHistory> wkpHistories = this.workplaceHistoryRepository
				.searchWorkplaceHistory(input.getBaseDate(), jobHistories.stream()
						.map(AffJobTitleHistory::getEmployeeId).collect(Collectors.toList()),
						input.getWorkplaceCodes());

		List<String> empInWpl = wkpHistories.stream().map(AffWorkplaceHistory::getEmployeeId)
				.collect(Collectors.toList());

		// to employees
		List<EmployeeDataMngInfo> employeeDatas = this.employeeRepository
				.findByListEmployeeId(companyId, empInWpl);

		// to person info
		return this.toEmployee(
				input.getBaseDate(), employeeDatas.stream()
						.map(employee -> employee.getEmployeeId()).collect(Collectors.toList()),
				companyId);
	}

	/**
	 * Search of workplace.
	 *
	 * @param baseDate
	 *            the base date
	 * @return the list
	 */
	public List<EmployeeSearchData> searchOfWorkplace(GeneralDate baseDate) {
		// get login user
		LoginUserContext loginUserContext = AppContexts.user();

		// get company id
		String companyId = loginUserContext.companyId();

		// get employee id
		String employeeId = loginUserContext.employeeId();

		Optional<AffWorkplaceHistory> workplaceHistory = this.workplaceHistoryRepository
				.getByEmpIdAndStandDate(employeeId, baseDate);

		// check exist data
		if (!workplaceHistory.isPresent()) {
			throw new BusinessException("Msg_177");
		}
		// Find workplace of login employee.
		Optional<AffWorkplaceHistoryItem> wpl = this.affWorkplaceHistoryItemRepository
				.getByHistId(workplaceHistory.get().getHistoryItems().get(0).identifier());
		List<String> employeeIds = this.affWorkplaceHistoryItemRepository
				.getAffWrkplaHistItemByListWkpIdAndDate(baseDate, Arrays.asList(wpl.get().getWorkplaceId())).stream()
				.map(emp -> emp.getEmployeeId()).collect(Collectors.toList());

		// return data
		return this.toEmployee(baseDate, employeeIds, companyId);
	}

	/**
	 * Search workplace child.
	 *
	 * @param baseDate
	 *            the base date
	 * @return the list
	 */
	public List<EmployeeSearchData> searchWorkplaceChild(GeneralDate baseDate) {

		// get login user
		LoginUserContext loginUserContext = AppContexts.user();

		// get company id
		String companyId = loginUserContext.companyId();

		// get employee id
		String employeeId = loginUserContext.employeeId();

		// get data work place history
		Optional<AffWorkplaceHistory> workplaceHistory = this.workplaceHistoryRepository
				.getByEmpIdAndStandDate(employeeId, baseDate);

		// check exist data
		if (!workplaceHistory.isPresent()) {
			throw new BusinessException("Msg_177");
		}

		String wplId = this.affWorkplaceHistoryItemRepository
				.getByHistId(workplaceHistory.get().getHistoryItems().get(0).identifier()).get()
				.getWorkplaceId();

		// get data child
		List<String> wplIds = this.wkpExpService
				.getAllChildWorkplaceId(companyId, baseDate, wplId);
		List<AffWorkplaceHistoryItem> itemList = this.affWorkplaceHistoryItemRepository
				.findeByWplIDs(wplIds);

		List<String> empIds = itemList.stream().filter(item -> {
			return this.workplaceHistoryRepository
					.getByHistIdAndBaseDate(item.getHistoryId(), baseDate).isPresent();
		}).map(item -> item.getEmployeeId()).distinct().collect(Collectors.toList());
		// return data
		return this.toEmployee(baseDate, empIds, companyId);
	}

	/**
	 * Search workplace of employee.
	 *
	 * @param baseDate
	 *            the base date
	 * @return the list
	 */
	public List<String> searchWorkplaceOfEmployee(GeneralDate baseDate) {
		// get login user
		LoginUserContext loginUserContext = AppContexts.user();

		// get employee id
		String employeeId = loginUserContext.employeeId();

		// get data work place history
		List<AffWorkplaceHistoryItem> items = this.affWorkplaceHistoryItemRepository
				.getAffWrkplaHistItemByEmpIdAndDate(baseDate, employeeId);

		// return data
		return items.stream().map(AffWorkplaceHistoryItem::getWorkplaceId)
				.collect(Collectors.toList());
	}

	/**
	 * Gets the of selected employee.
	 *
	 * @param input
	 *            the input
	 * @return the of selected employee
	 */
	public List<EmployeeSearchData> getOfSelectedEmployee(EmployeeSearchListQuery input) {
		// get login user
		LoginUserContext loginUserContext = AppContexts.user();

		// get company id
		String companyId = loginUserContext.companyId();

		return this.toEmployee(input.getBaseDate(), input.getEmployeeIds(), companyId);
	}

	/**
	 * Search employees.
	 *
	 * @param query
	 *            the query
	 * @return the list
	 */
	public List<EmployeeSearchListData> searchEmployees(EmployeeSearchListQuery query) {

		// check exist data
		if (CollectionUtil.isEmpty(query.getEmployeeIds())) {
			return new ArrayList<>();
		}

		// get login user
		LoginUserContext loginUserContext = AppContexts.user();

		// get company id
		String companyId = loginUserContext.companyId();

		// get employee data list
		List<EmployeeDataMngInfo> employeeDatas = this.employeeRepository
				.findByListEmployeeId(companyId, query.getEmployeeIds());

		// get map person
		Map<String, PersonImport> personMap = this.personAdapter
				.findByPersonIds(employeeDatas.stream().map(employee -> employee.getPersonId())
						.collect(Collectors.toList()))
				.stream().collect(Collectors.toMap((person) -> {
					return person.getPersonId();
				}, Function.identity()));

		// get map work place history
		Map<String, AffWorkplaceHistory> mapWorkplaceHistory = this.workplaceHistoryRepository
				.findByEmployees(query.getEmployeeIds(), query.getBaseDate()).stream()
				.collect(Collectors.toMap((workplace) -> {
					return workplace.getEmployeeId();
				}, Function.identity()));

		// get map work place
		Map<String, WorkplaceInfo> mapWorkplace = this.workplaceConfigInfoRepo
				.findAll(companyId, query.getBaseDate()).stream()
				.collect(Collectors.toMap((workplace) -> {
					return workplace.getWorkplaceId();
				}, Function.identity()));

		// get map job title history
		Map<String, AffJobTitleHistory> mapJobTitleHistory = this.jobTitleHistoryRepository
				.findAllJobTitleHistory(query.getBaseDate(), query.getEmployeeIds()).stream()
				.collect(Collectors.toMap((jobtitle) -> {
					return jobtitle.getEmployeeId();
				}, Function.identity()));

		// get map job title
		Map<String, JobTitleInfo> mapJobTitle = this.jobTitleInfoRepo
				.findAll(companyId, query.getBaseDate()).stream()
				.collect(Collectors.toMap((jobtitle) -> {
					return jobtitle.getJobTitleId();
				}, Function.identity()));
		List<EmployeeSearchListData> dataRes = new ArrayList<>();

		for (EmployeeDataMngInfo employeeData : employeeDatas) {
			EmployeeSearchListData data = new EmployeeSearchListData();
			data.setEmployeeId(employeeData.getEmployeeId());
			data.setEmployeeCode(employeeData.getEmployeeCode().v());

			// check exist person data
			if (personMap.containsKey(employeeData.getPersonId())) {
				data.setEmployeeName(personMap.get(employeeData.getPersonId()).getBusinessName());
			}

			// check exist work place history
			// Find
			if (mapWorkplaceHistory.containsKey(employeeData.getEmployeeId())) {
				String wplId = this.affWorkplaceHistoryItemRepository
						.getByHistId(mapWorkplaceHistory.get(employeeData.getEmployeeId())
								.getHistoryItems().get(0).identifier())
						.get().getWorkplaceId();
				WorkplaceInfo workplace = mapWorkplace.get(wplId);
				data.setWorkplaceId(workplace != null ? workplace.getWorkplaceId() : "");
				data.setWorkplaceCode(workplace != null ? workplace.getWorkplaceCode().v() : "");
				data.setWorkplaceName(workplace != null ? workplace.getWorkplaceName().v() : "");
			}

			// check exist job title history
			if (mapJobTitleHistory.containsKey(employeeData.getEmployeeId())) {
				String jobTitleId = this.affJobTitleHistoryItemRepository
						.findByHitoryId(mapJobTitleHistory.get(employeeData.getEmployeeId())
								.getHistoryItems().get(0).identifier())
						.get().getJobTitleId();
				JobTitleInfo jobTitleInfo = mapJobTitle.get(jobTitleId);
				data.setJobTitleId(jobTitleInfo != null ? jobTitleInfo.getJobTitleId() : "");
				data.setJobTitleCode(jobTitleInfo != null ? jobTitleInfo.getJobTitleCode().v() : "");
				data.setJobTitleName(jobTitleInfo != null ? jobTitleInfo.getJobTitleName().v() : "");
			}
			dataRes.add(data);
		}
		return dataRes;
	}

}
