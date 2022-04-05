/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.employment;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.i18n.I18NText;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.app.find.employment.dto.CommonMaterItemDto;
import nts.uk.ctx.bs.employee.app.find.employment.dto.EmploymentDto;
import nts.uk.ctx.bs.employee.app.find.employment.dto.EmploymentFindDto;
import nts.uk.ctx.bs.employee.app.find.employment.dto.GroupCommonMasterImport;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfo;
import nts.uk.ctx.bs.employee.dom.employee.mgndata.EmployeeDataMngInfoRepository;
import nts.uk.ctx.bs.employee.dom.employment.Employment;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentRepository;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistory;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryItem;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryRepository;
import nts.uk.ctx.bs.employee.dom.groupcommonmaster.GroupCommonMasterExportDto;
import nts.uk.ctx.bs.person.dom.person.common.ConstantUtils;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;
import nts.uk.shr.com.history.DateHistoryItem;

/**
 * The Class DefaultEmploymentFinder.
 */
@Stateless
public class EmploymentWithoutGroupCommonMasterFinderImpl implements EmploymentFinder {

	/** The repository. */
	@Inject
	private EmploymentRepository repository;

//	@Inject
//	private IGroupCommonMaster groupCommonMaster;
	
	@Inject
	private EmploymentHistoryRepository empHistRepo;
	
	@Inject
	private EmploymentRepository employmentRepository;
	
	@Inject
	private EmployeeDataMngInfoRepository empDataMngInfoRepo;

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.shr.find.employment.EmploymentFinder#findAll()
	 */
	public List<EmploymentDto> findAll() {

		// Get Login User Info
		LoginUserContext loginUserContext = AppContexts.user();

		// Get Company Id
		String companyId = loginUserContext.companyId();

		// Get All Employment
		List<Employment> empList = this.repository.findAll(companyId);

		// Save to Memento
		return empList.stream().map(employment -> {
			EmploymentDto dto = new EmploymentDto();
			dto.setCode(employment.getEmploymentCode().v());
			dto.setName(employment.getEmploymentName().v());
			return dto;
		}).collect(Collectors.toList());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.shr.find.employment.EmploymentFinder#findByCode(java.lang.String)
	 */
	@Override
	public EmploymentFindDto findByCode(String employmentCode) {
		String companyId = AppContexts.user().companyId();
		String contractCd = AppContexts.user().contractCode();
		EmploymentFindDto dto = new EmploymentFindDto();
		Optional<Employment> employment = this.repository.findEmployment(companyId, employmentCode);

		//TODO: グループ会社共通マスタ未対応
//		GroupCommonMasterExportDto data = groupCommonMaster.getGroupCommonMasterEnableItem(contractCd, "M000031", companyId,
//				GeneralDate.today());
//		dto.setCommonMasterName(data.getCommonMasterName());
//		dto.setCommonMasterItems(data.getCommonMasterItems().stream().map(
//				item -> new CommonMaterItemDto(item.getCommonMasterItemId(), item.getCommonMasterItemName().v(), item.getCommonMasterItemCode().v()))
//				.collect(Collectors.toList()));
		GroupCommonMasterExportDto data = new GroupCommonMasterExportDto();
		data.setCommonMasterItems(new ArrayList<>());
		
		if (!employment.isPresent()) {
		return dto;
		}
		dto.setCode(employmentCode);
		dto.setName(employment.get().getEmploymentName().v());
		dto.setEmpExternalCode(employment.get().getEmpExternalCode());
		dto.setMemo(employment.get().getMemo());
		//TODO: グループ会社共通マスタ未対応
//		if (data.getCommonMasterItems().isEmpty()) {
//			dto.setErrMessage("Msg_1580");
//			dto.setCode(employmentCode);
//			
//			return dto;
//		}
		if(employment.get().getEmpCommonMasterItemId().isPresent()){
			dto.setEmpCommonMasterItemId(employment.get().getEmpCommonMasterItemId().get());
		}
		

		int x = 1;
		if (x == 0) {
			dto.setShowsGroupCompany(false);
			return dto;
		}
		// アルゴリズム「使用している共通マスタの取得」を実行する --- (thực hiện thuật toán [lấy
		// CommonMaster đang sử dụng])
		/*
		 * [Input] ・契約コード//(contract code) ・共通マスタID = M000031//(common master
		 * ID=M000031) ・会社ID//(company ID) ・基準日 = システム日付//(baseDate= System
		 * Date)
		 */
		
		return dto;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.bs.employee.app.find.employment.EmploymentFinder#findByCodes(
	 * java.util.List)
	 */
	@Override
	public List<EmploymentDto> findByCodes(List<String> empCodes) {
		// Get Company Id
		String companyId = AppContexts.user().companyId();

		// Get All Employment
		List<Employment> empList = this.repository.findByEmpCodes(companyId, empCodes);

		// Save to Memento
		return empList.stream().map(employment -> {
			EmploymentDto dto = new EmploymentDto();
			dto.setCode(employment.getEmploymentCode().v());
			dto.setName(employment.getEmploymentName().v());
			return dto;
		}).collect(Collectors.toList());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.app.find.employment.EmploymentFinder#
	 * findByCodesWithNull(java.util.List)
	 */
	@Override
	public List<EmploymentDto> findByCodesWithNull(List<String> empCodes) {
		// Get Company Id

		List<EmploymentDto> result = new ArrayList<EmploymentDto>();

		String companyId = AppContexts.user().companyId();
		if (CollectionUtil.isEmpty(empCodes)) {
			return result;
		}

		empCodes.forEach(code -> {
			Optional<Employment> optEmp = this.repository.findEmployment(companyId, code);
			String itemName;
			if (optEmp.isPresent()) {
				itemName = optEmp.get().getEmploymentName().v();
			} else {
				itemName = code + I18NText.getText("KMF004_163");
			}

			result.add(new EmploymentDto(code, itemName));
		});
		return result;
	}

	@Override
	public GroupCommonMasterImport findGroupCommonMaster() {
		//TODO: グループ会社共通マスタ未対応
//		String companyId = AppContexts.user().companyId();
//		String contractCd = AppContexts.user().contractCode();
//		GroupCommonMasterExportDto data = groupCommonMaster.getGroupCommonMasterEnableItem(contractCd, "M000031", companyId,
//				GeneralDate.today());
		GroupCommonMasterExportDto data = new GroupCommonMasterExportDto();
		data.setCommonMasterItems(new ArrayList<>());

		GroupCommonMasterImport dto = new GroupCommonMasterImport();
		dto.setCommonMasterName(data.getCommonMasterName());
		dto.setCommonMasterItems(data.getCommonMasterItems().stream().map(
				item -> new CommonMaterItemDto(item.getCommonMasterItemId(), item.getCommonMasterItemName().v(), item.getCommonMasterItemCode().v()))
				.collect(Collectors.toList()));
		return dto;
	}
	
	
	// test requestList 638
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

	// test requestList 639
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
					.employmentCode(employment.getEmpExternalCode().toString())
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
	
	@Override
	public List<DataEmployeeExport> getEmployeeInfo(List<String> listSIdParam, GeneralDate baseDate) {
		
		// アルゴリズム「社員ID（List）と指定期間から社員の雇用履歴を取得」を実行する(Thực hiện thuật toán [Get
		// EmploymentHistory của employee tu EmployeeID（List）and period chỉ định])

		List<EmploymentHistoryItem> listEmpHistItem = this.empHistRepo.getEmploymentHisItem(listSIdParam, new DatePeriod(baseDate, baseDate));
		
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
}
