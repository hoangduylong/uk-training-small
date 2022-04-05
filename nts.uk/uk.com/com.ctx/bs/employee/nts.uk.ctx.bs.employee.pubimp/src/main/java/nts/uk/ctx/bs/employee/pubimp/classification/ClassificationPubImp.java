/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pubimp.classification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import lombok.RequiredArgsConstructor;
import lombok.val;
import nts.arc.layer.app.cache.CacheCarrier;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.employee.app.find.affiliatedcompanyhistory.AffCompanyHistItemDto;
import nts.uk.ctx.bs.employee.app.find.affiliatedcompanyhistory.AffiliatedCompanyHistoryFinder;
import nts.uk.ctx.bs.employee.app.find.classification.affiliate.AffClassificationDto;
import nts.uk.ctx.bs.employee.dom.classification.Classification;
import nts.uk.ctx.bs.employee.dom.classification.ClassificationRepository;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistItem;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistItemRepository;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistory;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistoryRepository;
import nts.uk.ctx.bs.employee.pub.classification.AffCompanyHistItemExport;
import nts.uk.ctx.bs.employee.pub.classification.ClassificationExport;
import nts.uk.ctx.bs.employee.pub.classification.EmpClassifiExport;
import nts.uk.ctx.bs.employee.pub.classification.SClsHistExport;
import nts.uk.ctx.bs.employee.pub.classification.SyClassificationPub;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;

/**
 * The Class ClassificationPubImp.
 */
@Stateless
public class ClassificationPubImp implements SyClassificationPub {

	/** The classification repository. */
	@Inject
	private ClassificationRepository classificationRepository;

	/** The aff class hist item repository ver 1. */
	@Inject
	private AffClassHistItemRepository affClassHistItemRepository;

	/** The aff class history repository ver 1. */
	@Inject
	private AffClassHistoryRepository affClassHistoryRepository;
	
	@Inject
	private AffiliatedCompanyHistoryFinder affiliatedCompanyHistoryFinder;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.bs.employee.pub.employment.SyEmploymentPub#findSEmpHistBySid(
	 * java.lang.String, java.lang.String, nts.arc.time.GeneralDate)
	 */
	@Override
	public Optional<SClsHistExport> findSClsHistBySid(String companyId, String employeeId,
			GeneralDate baseDate) {

		Optional<DateHistoryItem> dateHistoryItem = affClassHistoryRepository
				.getByEmpIdAndStandardDate(employeeId, baseDate);

		// Check exist
		if (!dateHistoryItem.isPresent()) {
			return Optional.empty();
		}

		Optional<AffClassHistItem> opAffClassHistItem = affClassHistItemRepository
				.getByHistoryId(dateHistoryItem.get().identifier());

		if (!opAffClassHistItem.isPresent()) {
			return Optional.empty();
		}

		// Find emp by empCd
		Optional<Classification> optClassification = classificationRepository.findClassification(
				companyId, opAffClassHistItem.get().getClassificationCode().v());

		if (!optClassification.isPresent()) {
			return Optional.empty();
		}

		// Get employment info
		Classification classification = optClassification.get();

		// Return
		return Optional.of(SClsHistExport.builder().employeeId(employeeId)
				.classificationCode(classification.getClassificationCode().v())
				.classificationName(classification.getClassificationName().v())
				.period(dateHistoryItem.get().span()).build());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.pub.classification.SyClassificationPub#
	 * findSClsHistBySid(java.lang.String, java.lang.String,
	 * nts.arc.time.calendar.period.DatePeriod)
	 */
	@Override
	public List<SClsHistExport> findSClsHistBySid(String companyId, List<String> employeeIds,
			DatePeriod datePeriod) {
		
		val cacheCarrier = new CacheCarrier();
		return findSClsHistBySidRequire(cacheCarrier, companyId, employeeIds, datePeriod);
	}
	@Override
	public List<SClsHistExport> findSClsHistBySidRequire(CacheCarrier cacheCarrier, String companyId, List<String> employeeIds,
			DatePeriod datePeriod) {

		val require = new RequireImpl(cacheCarrier);
		
		List<AffClassHistory> dateHistoryItem = require.getByEmployeeListWithPeriod(employeeIds, datePeriod);

		Map<String, DatePeriod> histPeriodMap = dateHistoryItem.stream()
				.map(AffClassHistory::getPeriods).flatMap(listContainer -> listContainer.stream())
				.collect(Collectors.toMap(DateHistoryItem::identifier, DateHistoryItem::span));

		List<String> histIds = dateHistoryItem.stream().map(AffClassHistory::getPeriods)
				.flatMap(listContainer -> listContainer.stream()).map(DateHistoryItem::identifier)
				.collect(Collectors.toList());

		List<AffClassHistItem> affClassHistItems = require.getByHistoryIds(histIds);

		List<String> clsCds = affClassHistItems.stream()
				.map(item -> item.getClassificationCode().v()).collect(Collectors.toList());

		// Find emp by empCd
		List<Classification> lstClassification = require.getClassificationByCodes(companyId, clsCds);

		Map<String, String> mapCls = lstClassification.stream()
				.collect(Collectors.toMap(item -> item.getClassificationCode().v(),
						item -> item.getClassificationName().v()));

		// Return
		return affClassHistItems.stream()
				.map(item -> SClsHistExport.builder().employeeId(item.getEmployeeId())
						.classificationCode(item.getClassificationCode().v())
						.classificationName(mapCls.get(item.getClassificationCode().v()))
						.period(histPeriodMap.get(item.getHistoryId())).build())
				.collect(Collectors.toList());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.pub.classification.SyClassificationPub#
	 * getClassificationMap(java.lang.String, java.util.List)
	 */
	@Override
	public Map<String, String> getClassificationMapCodeName(String companyId, List<String> clsCds) {
		List<Classification> lstClassification = classificationRepository
				.getClassificationByCodes(companyId, clsCds);
		return lstClassification.stream()
				.collect(Collectors.toMap(item -> item.getClassificationCode().v(),
						item -> item.getClassificationName().v()));
	}

	// for salary qmm016, 017
	@Override
	public List<ClassificationExport> getClassificationByCompanyId(String companyId) {
		return classificationRepository.getAllManagementCategory(companyId).stream().map(item -> {
			return new ClassificationExport(item.getCompanyId().v(), item.getClassificationCode().v(), item.getClassificationName().v(), item.getMemo().v());
		}).collect(Collectors.toList());
	}

	@Override
	public List<AffCompanyHistItemExport> getByIDAndBasedate(GeneralDate baseDate, List<String> listempID) {
		List<AffCompanyHistItemDto> listAffCompanyHistItem = this.affiliatedCompanyHistoryFinder.getByIDAndBasedate( baseDate , listempID);
		if (listAffCompanyHistItem.isEmpty()) {
			return new ArrayList<AffCompanyHistItemExport>();
		}
		
		List<AffCompanyHistItemExport> result = listAffCompanyHistItem.stream().map(item -> {
			AffCompanyHistItemExport export = AffCompanyHistItemExport.builder()
					.employeeID(item.getEmployeeID())
					.historyId(item.getHistoryId())
					.destinationData(item.isDestinationData())
					.startDate(item.getStartDate())
					.endDate(item.getEndDate()).build();
			return export;
		}).collect(Collectors.toList());
		
		return result;
	}

	@Override
	public List<EmpClassifiExport> getByListSIDAndBasedate(GeneralDate baseDate, List<String> listempID) {
		List<DateHistoryItem> history = affClassHistoryRepository.getByEmployeeListWithPeriod(AppContexts.user().companyId(),listempID, baseDate);
		if(history.isEmpty())
			return new ArrayList<>();
		List<AffClassHistItem> histItem = affClassHistItemRepository.getByHistoryIds(history.stream().map(i->i.identifier()).collect(Collectors.toList()));
		if(histItem.isEmpty())
			return new ArrayList<>();
		
		return histItem.stream().map(mapper -> {
			return new EmpClassifiExport(mapper.getEmployeeId(), mapper.getClassificationCode().toString());
		}).collect(Collectors.toList());
	}

	@RequiredArgsConstructor
	class RequireImpl implements ClassificationPubImp.Require{

		private final CacheCarrier cacheCarrier;
		@Override
		public List<AffClassHistory> getByEmployeeListWithPeriod(List<String> employeeIds, DatePeriod period) {
//			return
			return affClassHistoryRepository.getByEmployeeListWithPeriod(employeeIds, period);
		}
		@Override
		public List<AffClassHistItem> getByHistoryIds(List<String> historyIds) {
//			AffClassHistItemCache cache = cacheCarrier.get( AffClassHistItemCache.DOMAIN_NAME);
//			return cache.get();
			return affClassHistItemRepository.getByHistoryIds(historyIds);
		}
		@Override
		public List<Classification> getClassificationByCodes(String companyId, List<String> codes) {
//			ClassificationCache cache = cacheCarrier.get(ClassificationCache.DOMAIN_NAME);
//			return cache.get();
			return classificationRepository.getClassificationByCodes(companyId, codes);
		}
	}
	public static interface Require{
//		affClassHistoryRepository.getByEmployeeListWithPeriod(employeeIds, datePeriod);
		List<AffClassHistory> getByEmployeeListWithPeriod(List<String> employeeIds, DatePeriod period);
//		affClassHistItemRepository.getByHistoryIds(histIds);
		List<AffClassHistItem> getByHistoryIds(List<String> historyIds);
//		classificationRepository.getClassificationByCodes(companyId, clsCds);
		List<Classification> getClassificationByCodes(String companyId, List<String> codes);
	}
}
