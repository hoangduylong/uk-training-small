package nts.uk.ctx.bs.employee.pubimp.department.master;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.employee.dom.department.affiliate.AffDepartmentHistoryItem;
import nts.uk.ctx.bs.employee.dom.department.affiliate.AffDepartmentHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.department.master.DepartmentConfiguration;
import nts.uk.ctx.bs.employee.dom.department.master.DepartmentConfigurationRepository;
import nts.uk.ctx.bs.employee.dom.department.master.DepartmentInformation;
import nts.uk.ctx.bs.employee.dom.department.master.DepartmentInformationRepository;
import nts.uk.ctx.bs.employee.dom.department.master.service.DepartmentExportSerivce;
import nts.uk.ctx.bs.employee.pub.company.AffCompanyHistExport;
import nts.uk.ctx.bs.employee.pub.company.SyCompanyPub;
import nts.uk.ctx.bs.employee.pub.department.master.AffDpmHistItemExport;
import nts.uk.ctx.bs.employee.pub.department.master.DepartmentExport;
import nts.uk.ctx.bs.employee.pub.department.master.DepartmentInforExport;
import nts.uk.ctx.bs.employee.pub.department.master.DepartmentPub;

@Stateless
public class DepartmentPubImpl implements DepartmentPub {

	@Inject
	private DepartmentExportSerivce depExpService;
	@Inject
	private DepartmentInformationRepository depInforRepo;
	
	@Inject
	private AffDepartmentHistoryItemRepository affDepHistItemRepo;
	
	@Inject
	private DepartmentConfigurationRepository departmentConfigurationRepository;
	
	@Inject
	private DepartmentInformationRepository departmentInformationRepository;
	
	@Inject
	private SyCompanyPub syCompanyPub;

	@Override
	public List<DepartmentInforExport> getDepartmentInforByDepIds(String companyId, List<String> listDepartmentId,
			GeneralDate baseDate) {
		return depExpService.getDepartmentInforFromDepIds(companyId, listDepartmentId, baseDate).stream()
				.map(i -> new DepartmentInforExport(i.getDepartmentId(), i.getHierarchyCode(), i.getDepartmentCode(),
						i.getDepartmentName(), i.getDisplayName(), i.getGenericName(), i.getExternalCode()))
				.collect(Collectors.toList());
	}

	@Override
	public List<DepartmentInforExport> getAllActiveDepartment(String companyId, GeneralDate baseDate) {
		return depExpService.getAllActiveDepartment(companyId, baseDate).stream()
				.map(i -> new DepartmentInforExport(i.getDepartmentId(), i.getHierarchyCode().v(),
						i.getDepartmentCode().v(), i.getDepartmentName().v(), i.getDepartmentDisplayName().v(),
						i.getDepartmentGeneric().v(),
						i.getDepartmentExternalCode().isPresent() ? i.getDepartmentExternalCode().get().v() : null))
				.collect(Collectors.toList());
	}

	@Override
	public List<DepartmentInforExport> getPastDepartmentInfor(String companyId, String depHistId,
			List<String> listDepartmentId) {
		return depExpService.getPastDepartmentInfor(companyId, depHistId, listDepartmentId).stream()
				.map(i -> new DepartmentInforExport(i.getDepartmentId(), i.getHierarchyCode(), i.getDepartmentCode(),
						i.getDepartmentName(), i.getDisplayName(), i.getGenericName(), i.getExternalCode()))
				.collect(Collectors.toList());
	}
	
    // for salary qmm016, 017
	@Override
	public List<DepartmentExport> getDepartmentByCompanyIdAndBaseDate(String companyId, GeneralDate baseDate) {
		return depExpService.getAllActiveDepartment(companyId, baseDate).stream().map(item -> {
			return DepartmentExport.builder().companyId(item.getCompanyId()).depHistoryId(item.getDepartmentHistoryId())
					.departmentId(item.getDepartmentId()).departmentCode(item.getDepartmentCode().v())
					.departmentName(item.getDepartmentName().v()).depDisplayName(item.getDepartmentDisplayName().v())
					.depGenericName(item.getDepartmentGeneric().v())
					.outsideDepCode(item.getDepartmentExternalCode().map(ec -> ec.v())).build();
		}).collect(Collectors.toList());
	}

	@Override
	public List<String> getAllChildDepartmentId(String companyId, GeneralDate baseDate, String parentDepartmentId) {
		return depExpService.getAllChildDepartmentId(companyId, baseDate, parentDepartmentId);
	}

	@Override
	public List<String> getDepartmentIdAndChildren(String companyId, GeneralDate baseDate, String departmentId) {
		return depExpService.getDepartmentIdAndChildren(companyId, baseDate, departmentId);
	}

	@Override
	public Optional<DepartmentExport> getInfoDep(String companyId, String depId, GeneralDate baseDate) {
		return depInforRepo.getInfoDep(companyId, depId, baseDate).
				map(item -> DepartmentExport.builder()
				.companyId(item.getCompanyId()).depHistoryId(item.getDepartmentHistoryId())
				.departmentId(item.getDepartmentId()).departmentCode(item.getDepartmentCode().v())
				.departmentName(item.getDepartmentName().v()).depDisplayName(item.getDepartmentDisplayName().v())
				.depGenericName(item.getDepartmentGeneric().v())
				.outsideDepCode(item.getDepartmentExternalCode().map(ec -> ec.v())).build());
		
	}

	@Override
	public AffDpmHistItemExport getDepartmentHistItemByEmpDate(String employeeID, GeneralDate date) {
		Optional<AffDepartmentHistoryItem> item = affDepHistItemRepo.findByEmpDate(employeeID, date);
		if(!item.isPresent()) {
			return null;
		} else {
			return new AffDpmHistItemExport(
					item.get().getHistoryId(), 
					item.get().getEmployeeId(), 
					item.get().getDepartmentId(), 
					item.get().getAffHistoryTranfsType(), 
					item.get().getDistributionRatio().v());
		}
	}

	@Override
	public List<String> getUpperDepartment(String companyID, String departmentID, GeneralDate date) {
		// ドメインモデル「部門構成」を取得する
		Optional<DepartmentConfiguration> opDepartmentConfig = departmentConfigurationRepository.findByDate(companyID, date);
		if(!opDepartmentConfig.isPresent()) {
			throw new RuntimeException("error department config");
		}
		// ドメインモデル「部門情報」を取得する
		List<DepartmentInformation> departmentInforLst = departmentInformationRepository.getAllActiveDepartmentByCompany(
				companyID, 
				opDepartmentConfig.get().items().get(0).identifier());
		// 取得した「部門情報」から基準となる部門の階層コードを求める
		DepartmentInformation departmentInfor = departmentInforLst.stream().filter(x -> x.getDepartmentId().equals(departmentID)).findAny().get();
		// 求めた基準となる部門の階層コードから上位階層の部門を求める
		List<String> hierachyCDLst = new ArrayList<>();
		String sumCD = departmentInfor.getHierarchyCode().toString();
		Integer index = 3;
		while(sumCD.length() - 3 >= index) {
			hierachyCDLst.add(sumCD.substring(0, index));
			index+=3;
		}
		Collections.reverse(hierachyCDLst);
		// 求めた上位階層の部門のIDをOutputする
		List<String> upperDepartmentInforIDLst = new ArrayList<>();
		for(String hierachyCD : hierachyCDLst) {
			upperDepartmentInforIDLst.add(departmentInforLst.stream().filter(x -> x.getHierarchyCode().v().equals(hierachyCD)).findAny().get().getDepartmentId());
		}
		return upperDepartmentInforIDLst;
	}

	@Override
	public List<String> getDepartmentIDAndUpper(String companyID, String departmentID, GeneralDate date) {
		List<String> lstResult = new ArrayList<>();
		// Output「上位部門一覧」の先頭にパラメータ「部門ID」を追加する
		lstResult.add(departmentID);
		// 部門の上位部門を取得する
		lstResult.addAll(this.getUpperDepartment(companyID, departmentID, date));
		return lstResult;
	}

	@Override
	public List<String> getlstSidByDepAndDate(List<String> lstDepId, DatePeriod period) {
		//部門と基準日から所属部門履歴項目を取得する
		List<AffDepartmentHistoryItem> lstItem = affDepHistItemRepo.getAffDepartmentHistoryItems(lstDepId, period.start());
		//社員IDの重複は除く
		List<String> lstSid = lstItem.stream().map(c -> c.getEmployeeId()).distinct().collect(Collectors.toList());
		//ドメインモデル「所属会社履歴（社員別）」をすべて取得する(Lấy toàn bộ domain 「所属会社履歴（社員別）」)
		List<AffCompanyHistExport>  lstR = syCompanyPub.GetAffCompanyHistByEmployee(lstSid, period);
		//取得した「所属会社履歴項目」をすべて取得する
		//取得できた「所属会社履歴（社員別）」の社員IDを返す
		return lstR.stream().map(c -> c.getEmployeeId()).collect(Collectors.toList());
	}

}
