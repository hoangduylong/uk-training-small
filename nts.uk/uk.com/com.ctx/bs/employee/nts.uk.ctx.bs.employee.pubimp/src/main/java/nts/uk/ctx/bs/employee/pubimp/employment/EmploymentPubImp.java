/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pubimp.employment;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import lombok.RequiredArgsConstructor;
import lombok.val;
import nts.arc.layer.app.cache.CacheCarrier;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfo;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfoRepository;
import nts.uk.ctx.bs.employee.dom.employment.Employment;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentInfo;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentRepository;
import nts.uk.ctx.bs.employee.dom.employment.EmpmInfo;
import nts.uk.ctx.bs.employee.dom.employment.history.DateHistItem;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistory;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryItem;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryRepository;
import nts.uk.ctx.bs.employee.pub.employment.AffPeriodEmpCdHistExport;
import nts.uk.ctx.bs.employee.pub.employment.AffPeriodEmpCdHistExport.AffPeriodEmpCdHistExportBuilder;
import nts.uk.ctx.bs.employee.pub.employment.AffPeriodEmpCodeExport;
import nts.uk.ctx.bs.employee.pub.employment.DataEmployeeExport;
import nts.uk.ctx.bs.employee.pub.employment.DataTemp;
import nts.uk.ctx.bs.employee.pub.employment.DataTemp1;
import nts.uk.ctx.bs.employee.pub.employment.EmpCdNameExport;
import nts.uk.ctx.bs.employee.pub.employment.EmployeeBasicInfoExport;
import nts.uk.ctx.bs.employee.pub.employment.EmploymentCodeAndPeriod;
import nts.uk.ctx.bs.employee.pub.employment.EmploymentHisExport;
import nts.uk.ctx.bs.employee.pub.employment.EmploymentInfoExport;
import nts.uk.ctx.bs.employee.pub.employment.ObjectParam;
import nts.uk.ctx.bs.employee.pub.employment.SEmpHistExport;
import nts.uk.ctx.bs.employee.pub.employment.ShEmploymentExport;
import nts.uk.ctx.bs.employee.pub.employment.SyEmploymentPub;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;

/**
 * The Class EmploymentPubImp.
 */
@Stateless
public class EmploymentPubImp implements SyEmploymentPub {

	/** The employment history repository. */

	@Inject
	private EmploymentHistoryRepository empHistRepo;

	/** The employment history item repository. */
	@Inject
	private EmploymentHistoryItemRepository empHistItemRepo;

	/** The employment repository. */
	@Inject
	private EmploymentRepository employmentRepository;
	
	@Inject
	private EmployeeDataMngInfoRepository empDataMngInfoRepo;

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.pub.employment.SyEmploymentPub#findAll(java.lang.
	 * String)
	 */
	@Override
	public List<EmpCdNameExport> findAll(String companyId) {
		return employmentRepository.findAll(companyId).stream().map(item -> EmpCdNameExport.builder()
				.code(item.getEmploymentCode().v()).name(item.getEmploymentName().v()).build())
				.collect(Collectors.toList());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.pub.employment.SyEmploymentPub#findSEmpHistBySid(
	 * java.lang.String, java.lang.String, nts.arc.time.GeneralDate)
	 */
	@Override
	@TransactionAttribute(TransactionAttributeType.SUPPORTS)
	public Optional<SEmpHistExport> findSEmpHistBySid(String employeeId, GeneralDate baseDate) {
		val cacheCarrier = new CacheCarrier();
		return findSEmpHistBySidRequire(cacheCarrier, AppContexts.user().companyId(), employeeId, baseDate);
	}

	@Override
	@TransactionAttribute(TransactionAttributeType.SUPPORTS)
	public Optional<SEmpHistExport> findSEmpHistBySid(String companyId, String employeeId, GeneralDate baseDate) {
		val cacheCarrier = new CacheCarrier();
		return findSEmpHistBySidRequire(cacheCarrier, companyId, employeeId, baseDate);
	}
	@Override
	@TransactionAttribute(TransactionAttributeType.SUPPORTS)
	public Optional<SEmpHistExport> findSEmpHistBySidRequire(CacheCarrier cacheCarrier, String companyId, String employeeId, GeneralDate baseDate) {

		val require = new RequireImpl(cacheCarrier);
		
		// Query
		Optional<EmploymentInfo> employmentInfo = require
				.getDetailEmploymentHistoryItem(companyId, employeeId, baseDate);

		Optional<DateHistoryItem> optHistoryItem = require
				.getByEmployeeIdAndStandardDate(employeeId, baseDate);

		// Check exist
		if (!employmentInfo.isPresent() || !optHistoryItem.isPresent()) {
			return Optional.empty();
		}

		EmploymentInfo employment = employmentInfo.get();

		// Return
		return Optional
				.of(SEmpHistExport.builder().employeeId(employeeId).employmentCode(employment.getEmploymentCode())
						.employmentName(employment.getEmploymentName()).period(optHistoryItem.get().span()).build());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.bs.employee.pub.employment.SyEmploymentPub#findByEmpCodes(java
	 * .lang.String, java.util.List)
	 */
	@Override
	public List<ShEmploymentExport> findByEmpCodes(String companyId, List<String> empCodes) {
		List<Employment> empList = this.employmentRepository.findByEmpCodes(companyId, empCodes);
		return empList.stream().map(emp -> {
			ShEmploymentExport empExport = new ShEmploymentExport();
			empExport.setCompanyId(emp.getCompanyId().v());
			empExport.setEmploymentCode(emp.getEmploymentCode().v());
			empExport.setEmploymentName(emp.getEmploymentName().v());
			empExport.setEmpExternalCode(emp.getEmpExternalCode().v());
			empExport.setMemo(emp.getMemo().v());
			return empExport;
		}).collect(Collectors.toList());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.pub.employment.SyEmploymentPub#findByListSidAndPeriod(java.util.List, nts.uk.shr.com.time.calendar.period.DatePeriod)
	 */
	@Override
	@TransactionAttribute(TransactionAttributeType.SUPPORTS)
	public List<EmploymentHisExport> findByListSidAndPeriod(List<String> sids, DatePeriod datePeriod) {

		if (sids.isEmpty() || datePeriod.start() == null || datePeriod.end() == null)
			return new ArrayList<>();
		List<EmploymentHistory> lstEmpHist = empHistRepo.getByListSid(sids, datePeriod);

		if (lstEmpHist.isEmpty())
			return new ArrayList<>();

		List<String> historyIds = new ArrayList<>();

		lstEmpHist.stream().forEach(x -> {
			
			List<DateHistoryItem> historyItemList = x.getHistoryItems();
			List<String> hists = new ArrayList<>();
			if (!historyItemList.isEmpty()) {
				hists = historyItemList.stream().map(y -> y.identifier()).collect(Collectors.toList());
				historyIds.addAll(hists);
			}
		});

		if (historyIds.isEmpty())
			return new ArrayList<>();

		List<EmploymentHistoryItem> empHistItems = empHistItemRepo.getByListHistoryId(historyIds);
		Map<String, String> mapHistIdToEmpCode = empHistItems.stream().collect(Collectors.toMap( x -> x.getHistoryId(), x -> x.getEmploymentCode() == null ? null : x.getEmploymentCode().v()));
		
		return lstEmpHist.stream().map(x-> {
			EmploymentHisExport emp = new EmploymentHisExport();
			emp.setEmployeeId(x.getEmployeeId());
			List<EmploymentCodeAndPeriod> lst = x.getHistoryItems().stream().map(c -> new EmploymentCodeAndPeriod(c.identifier(), new DatePeriod(c.start(), c.end()), mapHistIdToEmpCode.get(c.identifier()))).collect(Collectors.toList());
			emp.setLstEmpCodeandPeriod(lst);
			return emp;
		}).collect(Collectors.toList());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.pub.employment.SyEmploymentPub#
	 * getEmpHistBySidAndPeriod(java.util.List,
	 * nts.uk.shr.com.time.calendar.period.DatePeriod)
	 */
	@Override
	@TransactionAttribute(TransactionAttributeType.SUPPORTS)
	public List<AffPeriodEmpCdHistExport> getEmpHistBySidAndPeriod(List<String> sids,
			DatePeriod datePeriod) {
		val cacheCarrier = new CacheCarrier();
		return getEmpHistBySidAndPeriodRequire(cacheCarrier, sids, datePeriod);
	}
	@Override
	@TransactionAttribute(TransactionAttributeType.SUPPORTS)
	public List<AffPeriodEmpCdHistExport> getEmpHistBySidAndPeriodRequire(
			CacheCarrier cacheCarrier, List<String> sids,DatePeriod datePeriod) {
		
		val require = new RequireImpl(cacheCarrier);

		List<EmploymentHistory> lstEmpHist = require.getByListSid(
				sids,datePeriod);

		List<String> historyIds = lstEmpHist.stream().map(EmploymentHistory::getHistoryItems)
				.flatMap(listContainer -> listContainer.stream()).map(DateHistoryItem::identifier)
				.collect(Collectors.toList());

		List<EmploymentHistoryItem> empHistItems = require.getByListHistoryId(historyIds);
		
		Map<String, String> mapHistIdToEmpCode = empHistItems.stream()
				.collect(Collectors.toMap(x -> x.getHistoryId(),
						x -> x.getEmploymentCode() == null ? null : x.getEmploymentCode().v()));

		return lstEmpHist.stream().map(item -> {
			AffPeriodEmpCdHistExportBuilder empBuilder = AffPeriodEmpCdHistExport.builder();
			empBuilder.employeeId(item.getEmployeeId());
			empBuilder.affPeriodEmpCodeExports(item.getHistoryItems().stream()
					.map(histItem -> AffPeriodEmpCodeExport.builder()
							.employmentCode(mapHistIdToEmpCode.get(histItem.identifier()))
							.period(histItem.span()).build())
					.collect(Collectors.toList()));
			return empBuilder.build();
		}).collect(Collectors.toList());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.pub.employment.SyEmploymentPub#getEmploymentMap(java.lang.String, java.util.List)
	 */
	@Override
	public Map<String, String> getEmploymentMapCodeName(String companyId, List<String> empCodes) {
		List<Employment> empList = this.employmentRepository.findByEmpCodes(companyId, empCodes);
		return empList.stream().collect(Collectors.toMap(item -> item.getEmploymentCode().v(),
				item -> item.getEmploymentName().v()));
	}

	@Override
	public Map<String, SEmpHistExport> findSEmpHistBySidVer2(String companyId, List<String> lstSID, GeneralDate baseDate) {
		//get emp hist
		Map<String, EmpmInfo> mapEmpInfo = empHistItemRepo.getLstDetailEmpHistItem(companyId, lstSID, baseDate);

		Map<String, DateHistItem> mapHistItem = empHistRepo.getBySIdAndate(lstSID, baseDate);

		// Check exist
		if (mapEmpInfo.isEmpty() || mapHistItem.isEmpty()) {
			return new HashMap<>();
		}
		Map<String, SEmpHistExport> mapResult = new HashMap<>();
		for(String sid : lstSID){		
			if(!mapEmpInfo.containsKey(sid) || !mapHistItem.containsKey(sid)){
				continue;
			}
			EmpmInfo emp = mapEmpInfo.get(sid);
			DateHistItem hist = mapHistItem.get(sid);
			mapResult.put(sid, SEmpHistExport.builder().employeeId(emp.getSid()).employmentCode(emp.getEmploymentCode())
						.employmentName(emp.getEmploymentName()).period(hist.getPeriod()).build());
		}
		return mapResult;
	}
	
	@RequiredArgsConstructor
	class RequireImpl implements EmploymentPubImp.Require{
		
		private final CacheCarrier cacheCarrier;

		@Override
		public List<EmploymentHistory> getByListSid(List<String> employeeIds, DatePeriod datePeriod) {
//			EmploymentHistoryCache cache = cacheCarrier.get(EmploymentHistoryCache.DOMAIN_NAME);
//			return cache.get(employeeIds,datePeriod);
			return empHistRepo.getByListSid(employeeIds, datePeriod);
		}

		@Override
		public List<EmploymentHistoryItem> getByListHistoryId(List<String> historyIds) {
//			EmploymentHistoryItemCache cache = cacheCarrier.get(EmploymentHistoryItemCache.DOMAIN_NAME);
//			return cache.get(historyIds);
			return empHistItemRepo.getByListHistoryId(historyIds);
		}

		@Override
		public Optional<EmploymentInfo> getDetailEmploymentHistoryItem(String companyId, String sid, GeneralDate date) {
//			EmploymentInfoCache cache = cacheCarrier.get(EmploymentInfoCache.DOMAIN_NAME);
//			return cache.get(sid,date);
			return empHistItemRepo.getDetailEmploymentHistoryItem(companyId, sid, date);
		}

		@Override
		public Optional<DateHistoryItem> getByEmployeeIdAndStandardDate(String employeeId, GeneralDate standardDate) {
//			DateHistoryItemCache cache = cacheCarrier.get(DateHistoryItemCache.DOMAIN_NAME);
//			return cache.get(employeeId, standardDate);
			return empHistRepo.getByEmployeeIdAndStandardDate(employeeId, standardDate);
		}
		
	}
	
	public static interface Require{
//		empHistRepo.getByListSid(sids,datePeriod);
		List<EmploymentHistory> getByListSid(List<String> employeeIds  ,  DatePeriod datePeriod);
//		empHistItemRepo.getByListHistoryId(historyIds);
		List<EmploymentHistoryItem> getByListHistoryId(List<String> historyIds);
//		empHistItemRepo.getDetailEmploymentHistoryItem(companyId, employeeId, baseDate);
		Optional<EmploymentInfo> getDetailEmploymentHistoryItem(String cid, String sid, GeneralDate date);
//		empHistRepo.getByEmployeeIdAndStandardDate(employeeId, baseDate);
		Optional<DateHistoryItem> getByEmployeeIdAndStandardDate(String employeeId, GeneralDate standardDate);
		
	}

	@Override
	public List<EmployeeBasicInfoExport> getEmploymentBasicInfo(List<ObjectParam> listObjParam, GeneralDate baseDate, String cid) {
		
		if (listObjParam.isEmpty() || baseDate == null || cid == null || cid == "") {
			return new ArrayList<>();
		}
		
		List<EmployeeBasicInfoExport> result = new ArrayList<>();
		
		for (ObjectParam objectParam : listObjParam) {
			if (objectParam.getEmploymentCode() != null && objectParam.getBirthdayPeriod().start() != null && objectParam.getBirthdayPeriod().end() != null) {
				
				// 条件に一致する情報をjoinして取得する (join và lấy thông tin phù hợp với điều kiện)
				List<Object[]> data = empHistRepo.getEmploymentBasicInfo(objectParam.getEmploymentCode(), objectParam.getBirthdayPeriod(), baseDate, cid); 
				if (!data.isEmpty()) {
					for (int i = 0; i < data.size(); i++) {
						EmployeeBasicInfoExport empInfo =  EmployeeBasicInfoExport.builder()
								.employmentCode(data.get(i)[0] == null ? null : data.get(i)[0].toString())
								.dateJoinComp(data.get(i)[1] == null ? null : GeneralDate.fromString(data.get(i)[1].toString(), ConstantUtils.FORMAT_DATE_YYYYMMDD))
								.sid(data.get(i)[2] == null ? null : data.get(i)[2].toString())
								.pid(data.get(i)[3] == null ? null : data.get(i)[3].toString())
								.birthday(data.get(i)[4] == null ? null : GeneralDate.fromString(data.get(i)[4].toString(), ConstantUtils.FORMAT_DATE_YYYYMMDD))
								.build();
						result.add(empInfo);
					}
				}
			}
		}
		return result;
	}
	

	@Override
	public List<DataEmployeeExport> getEmployeeInfo(List<String> listSIdParam, GeneralDate baseDate) {
		
		// アルゴリズム「社員ID（List）と指定期間から社員の雇用履歴を取得」を実行する(Thực hiện thuật toán [Get
		// EmploymentHistory của employee tu EmployeeID（List）and period chỉ định])

		List<EmploymentHistoryItem> listEmpHistItem = this.empHistRepo.getEmploymentHisItem(listSIdParam, new DatePeriod(baseDate, baseDate) );
		
		if (listEmpHistItem.isEmpty()) {
			return new ArrayList<>();
		}
		
		List<String> listHistID = listEmpHistItem.stream().map(Item -> Item.getHistoryId()).collect(Collectors.toList());
		
		List<EmploymentHistory> listEmpHist =  this.empHistRepo.getByListHistId(listHistID);
		
		List<DataTemp> listDataTemp = new ArrayList<>();
		
		for (int i = 0; i < listEmpHist.size(); i++) {
			DataTemp dataTemp = new DataTemp();
			dataTemp.setSid(listEmpHist.get(i).getEmployeeId());
			List<DataTemp1> listDataTemp1 = new ArrayList<>();
			if (!listEmpHist.get(i).getHistoryIds().isEmpty()) {
				for (int j = 0; j < listEmpHist.get(i).getHistoryItems().size(); j++) {
					DateHistoryItem dateHistoryItem = listEmpHist.get(i).getHistoryItems().get(j);
					String employmentCode = listEmpHistItem.stream()
							.filter(it -> it.getHistoryId().equals(dateHistoryItem.identifier())).findFirst().get()
							.getEmploymentCode().toString();
					DataTemp1 temp1 = DataTemp1.builder()
							.employmentCode(employmentCode)
							.datePeriod(new DatePeriod(dateHistoryItem.start(), dateHistoryItem.end()))
							.build();
					listDataTemp1.add(temp1);
				}
			}
			dataTemp.setListEmpCodeAndDatePeriod(listDataTemp1);
			listDataTemp.add(dataTemp);
		}
	
		List<String> listSid = listDataTemp.stream().map(e -> e.getSid()).collect(Collectors.toList());
		
		// アルゴリズム「社員ID(List)から削除されていない社員を取得する」を実行する(thực hiện thuật toán [lấy employee chưa bị xóa từ employeeID(List)])
		List<EmployeeDataMngInfo> listEmpdataMng = empDataMngInfoRepo.findBySidNotDel(listSid);
		
		// set data Result
		List<DataEmployeeExport> result = new ArrayList<>();
		listEmpdataMng.forEach(emp -> {
			
			DataTemp dataHistoryItems = listDataTemp.stream()
					.filter(e -> e.getSid().equals(emp.getEmployeeId()))
					.findFirst().get();
			if (!dataHistoryItems.getListEmpCodeAndDatePeriod().isEmpty()) {
				for (int i = 0; i < dataHistoryItems.getListEmpCodeAndDatePeriod().size(); i++) {
					DataTemp1 temp1 = dataHistoryItems.getListEmpCodeAndDatePeriod().get(i);
					DataEmployeeExport dataEmployeeExport = DataEmployeeExport.builder()
							.employmentCode(temp1.getEmploymentCode())
							.sid(emp.getEmployeeId())
							.pid(emp.getPersonId())
							.build();
					result.add(dataEmployeeExport);
				}
			}
		});
		
		return result;
	}

	@Override
	@TransactionAttribute(TransactionAttributeType.SUPPORTS)
	public List<SEmpHistExport> findSEmpHistBySid(String companyId, String employeeId) {
		List<SEmpHistExport> result = new ArrayList<>();
		
		List<DateHistoryItem> listHistoryItem = empHistRepo
				.getByEmployeeId(employeeId);
		
		for(DateHistoryItem dateHistoryItem : listHistoryItem) {
			Optional<EmploymentInfo> employmentInfo = empHistItemRepo
					.getDetailEmploymentHistoryItem(companyId, employeeId, dateHistoryItem.start());
			if(employmentInfo.isPresent()) {
				EmploymentInfo employment = employmentInfo.get();
				result.add(SEmpHistExport.builder().employeeId(employeeId).employmentCode(employment.getEmploymentCode())
						.employmentName(employment.getEmploymentName()).period(dateHistoryItem.span()).build());
			}
		}
		return result;
	}

	@Override
	public List<EmploymentInfoExport> getEmploymentInfo(String cid, Optional<Boolean> getEmploymentNameParam, Optional<Boolean> getEmpExternalCodeParam,
			Optional<Boolean> getMemoParam, Optional<Boolean> getempCommonMasterIDParam,
			Optional<Boolean> getempCommonMasterItemIDParam) {
				
		Boolean getEmploymentName = true;
		Boolean getEmpExternalCode = false;
		Boolean getMemo = false;
		Boolean getempCommonMasterID = false;
		Boolean getempCommonMasterItemID = false;
		
		if (!getEmploymentNameParam.isPresent()) {
			getEmploymentName = true;
		}else{
			getEmploymentName = getEmploymentNameParam.get();
		}
		
		if (!getEmpExternalCodeParam.isPresent()) {
			getEmpExternalCode = false;
		}else{
			getEmpExternalCode = getEmpExternalCodeParam.get();
		}
		
		if (!getMemoParam.isPresent()) {
			getMemo = false;
		}else{
			getMemo = getMemoParam.get();
		}
		
		if (!getempCommonMasterIDParam.isPresent()) {
			getempCommonMasterID = false;
		}else{
			getempCommonMasterID = getempCommonMasterIDParam.get();
		}
		
		if (!getempCommonMasterItemIDParam.isPresent()) {
			getempCommonMasterItemID = false;
		}else{
			getempCommonMasterItemID = getempCommonMasterItemIDParam.get();
		}
		
		// ドメインモデル [雇用] を取得する(Lấy domain [employment])
		List<Employment> listEmployment = this.employmentRepository.findAll(cid);
		if (listEmployment.isEmpty()) {
			return new ArrayList<>();
		}
		
		List<EmploymentInfoExport> result = new ArrayList<>();
		
		for (Employment employment : listEmployment) {
			EmploymentInfoExport employmentInfoExport = EmploymentInfoExport.builder()
					.companyId(employment.getCompanyId().toString())
					.employmentCode(employment.getEmploymentCode() == null ? null : employment.getEmploymentCode().toString())
					.employmentName(getEmploymentName == true ? employment.getEmploymentName().toString() : null)
					.empExternalCode(getEmpExternalCode == true ? employment.getEmpExternalCode().toString() : null)
					.memo(getMemo == true ? employment.getMemo().toString() : null)
					.empCommonMasterId(getempCommonMasterID == true && employment.getEmpCommonMasterId().isPresent() ? employment.getEmpCommonMasterId().get() : null)
					.empCommonMasterItemId(getempCommonMasterItemID == true && employment.getEmpCommonMasterItemId().isPresent() ? employment.getEmpCommonMasterItemId().get() : null)
					.build();
			
			result.add(employmentInfoExport);
		}
		
		return result;
	}

}
