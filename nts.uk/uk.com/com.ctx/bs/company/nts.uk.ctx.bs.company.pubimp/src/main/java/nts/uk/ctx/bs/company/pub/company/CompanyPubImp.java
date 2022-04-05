package nts.uk.ctx.bs.company.pub.company;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.RequiredArgsConstructor;
import lombok.val;
import nts.arc.layer.app.cache.CacheCarrier;
import nts.arc.time.YearMonth;
import nts.arc.time.calendar.period.YearMonthPeriod;
import nts.uk.ctx.bs.company.dom.company.AbolitionAtr;
import nts.uk.ctx.bs.company.dom.company.AddInfor;
import nts.uk.ctx.bs.company.dom.company.Company;
import nts.uk.ctx.bs.company.dom.company.CompanyCode;
import nts.uk.ctx.bs.company.dom.company.CompanyRepository;
import nts.uk.ctx.bs.company.dom.company.MonthStr;
import nts.uk.ctx.bs.company.dom.company.Name;
import nts.uk.ctx.bs.company.dom.company.primitive.ContractCd;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class CompanyPubImp implements ICompanyPub {

	@Inject
	private CompanyRepository repo;

	@Override
	public List<CompanyExport> getAllCompany() {
		String contractCd = AppContexts.user().contractCode();
		return repo
				.getAllCompany(contractCd).stream().map(item -> new CompanyExport(item.getCompanyCode().v(),
						item.getCompanyName().v(), item.getCompanyId(), item.getIsAbolition().value))
				.collect(Collectors.toList());

	}

	@Override
	public List<CompanyExport> getAllCompanyByContract(String contractCode){
		return repo.getAllCompanyByContractCdandAboAtr(contractCode, AbolitionAtr.NOT_ABOLITION.value).stream().map(item -> new CompanyExport(item.getCompanyCode().v(),
						item.getCompanyName().v(), item.getCompanyId(), item.getIsAbolition().value))
				.collect(Collectors.toList());
	}

	@Override
	public BeginOfMonthExport getBeginOfMonth(String cid) {
		val cacheCarrier = new CacheCarrier();
		return getBeginOfMonthRequire(cacheCarrier, cid);
	}
	
	@Override
	public BeginOfMonthExport getBeginOfMonthRequire(CacheCarrier cacheCarrier,String cid) {
		BeginOfMonthExport result = new BeginOfMonthExport();
		Optional<Company> comOpt = repo.getComanyInfoByCid(cid);
		if (comOpt.isPresent()) {
			Company company = comOpt.get();
			result.setCid(company.getCompanyId());
			result.setStartMonth(company.getStartMonth().value);
		}
		return result;
	}

	@RequiredArgsConstructor
	class RequireImpl implements CompanyPubImp.Require{
		
		private final CacheCarrier cacheCarrier;
		
		@Override
		public Optional<Company> getComanyInfoByCid(String companyId){
//			CompanyCache cache = cacheCarrier.get(CompanyCache.DOMAIN_NAME);
//			return cache.get(companyId);
			return repo.getComanyInfoByCid(companyId);
		}
	}
	
	public static interface Require{
//		repo.getComanyInfoByCid(cid);
		Optional<Company> getComanyInfoByCid(String cid);
	}
	/**
	 * for request list No.125
	 * @return Company Info
	 */
	@Override
	public CompanyExport getCompanyByCid(String cid) {
		Optional<Company> companyOpt = repo.getComanyByCid(cid);
		CompanyExport result = new CompanyExport();
		if (companyOpt.isPresent()) {
			Company company = companyOpt.get();
			result.setCompanyCode(company.getCompanyCode() == null ? "" : company.getCompanyCode().v());
			result.setCompanyId(company.getCompanyId());
			result.setCompanyName(company.getCompanyName() == null ? "" : company.getCompanyName().v());
			result.setIsAbolition(company.getIsAbolition().value);
		}
		return result;

	}

	/**
	 * For request list No.289
	 */
	@Override
	public List<String> acquireAllCompany() {
		String contractCd = AppContexts.user().contractCode();
		
		// ドメインモデル「会社情報」を取得する
		List<Company> comps = repo.getAllCompanyByContractCd(contractCd);
		
		if(comps.size() >= 1) {
			List<String> cIds = new ArrayList<>();
			
			for (Company item : comps) {
				cIds.add(item.getCompanyId());
			}
			
			return cIds;
		} else {
			return Collections.emptyList();
		}
	}

	@Override
	public List<CompanyExport> getAllCompanyInfor() {
		String contractCd = AppContexts.user().contractCode();
		List<Company> listCompanyInfor = repo.getAllCompanyByContractCdandAboAtr(contractCd,
				AbolitionAtr.NOT_ABOLITION.value);
		if (listCompanyInfor.isEmpty())
			return new ArrayList<>();
		else {
			return listCompanyInfor.stream().map(item -> new CompanyExport(item.getCompanyCode().v(),
					item.getCompanyName().v(), item.getCompanyId(), item.getIsAbolition().value))
					.collect(Collectors.toList());
		}
	}

	@Override
	public CompanyExport getCompany(String cid) {
		Optional<Company> companyOpt = repo.getCompany(cid);
		CompanyExport result = new CompanyExport();
		if (companyOpt.isPresent()) {
			Company company = companyOpt.get();
			result.setCompanyCode(company.getCompanyCode() == null ? "" : company.getCompanyCode().v());
			result.setCompanyId(company.getCompanyId());
			result.setCompanyName(company.getCompanyName() == null ? "" : company.getCompanyName().v());
			result.setIsAbolition(company.getIsAbolition().value);
		}
		return result;
	}

	@Override
	public List<CompanyExport> getLstComByContractAbo(String contractCd, int isAbolition) {
		List<Company> listCompany = repo.getAllCompanyByContractCdandAboAtr(contractCd, isAbolition);
			return listCompany.stream().map(item -> new CompanyExport(item.getCompanyCode().v(),
					item.getCompanyName().v(), item.getCompanyId(), item.getIsAbolition().value))
					.collect(Collectors.toList());
	}

	@Override
	public Optional<CompanyExport622> getCompanyNotAbolitionByCid(String cid) {
		Optional<Company> companyOpt =  repo.getComanyNotAbolitionByCid(cid);
		
		if(companyOpt.isPresent()) {
			
			Company company = companyOpt.get();
			
			Optional<AddInfor> addInfor = company.getAddInfor();
			
			AddInforExport addInforExport = new AddInforExport();
			
			if(addInfor.isPresent()) {
				addInforExport = new AddInforExport(addInfor.get().getCompanyId(), 
						addInfor.get().getFaxNum()== null?"": addInfor.get().getFaxNum().v(),
						addInfor.get().getAdd_1() == null? "": addInfor.get().getAdd_1().v(),
						addInfor.get().getAdd_2() == null? "": addInfor.get().getAdd_2().v(),
						addInfor.get().getAddKana_1() == null? "": addInfor.get().getAddKana_1().v(),
						addInfor.get().getAddKana_2() == null? "": addInfor.get().getAddKana_2().v(),
						addInfor.get().getPostCd() == null? "": addInfor.get().getPostCd().v(),
						addInfor.get().getPhoneNum() == null? "": addInfor.get().getPhoneNum().v());
			}
			
			CompanyExport622 companyExport = new CompanyExport622(company.getCompanyId(),
					company.getCompanyCode() == null? "": company.getCompanyCode().v(),
					company.getCompanyName() == null? "": company.getCompanyName().v(),
					company.getComNameKana().isPresent() ? company.getComNameKana().get().v(): "",
					company.getShortComName().isPresent() ? company.getShortComName().get().v(): "",
					company.getRepname().isPresent() ? company.getRepname().get().v(): "",
					company.getRepjob().isPresent() ? company.getRepjob().get().v(): "",
					company.getContractCd() == null? "": company.getContractCd().v(),
					company.getTaxNo().isPresent() ? company.getTaxNo().get().v(): "",
					company.getStartMonth() == null? 1: company.getStartMonth().value,
					addInforExport,
					company.getIsAbolition().value);
			
			return Optional.of(companyExport);
		}
		
		return Optional.empty();
	}

	@Override
	public List<CompanyExportForKDP003> get(String contractCd, Optional<String> cid, Boolean isAbolition) {
		
		List<CompanyExportForKDP003> result = new ArrayList<>();
		if (!cid.isPresent()) {
			result = repo.getAllCompanyByContractCdandAboAtr(contractCd, isAbolition ? 1 : 0 )
					.stream().map(item -> new CompanyExportForKDP003(item.getCompanyCode().v(),item.getCompanyName().v(), item.getCompanyId(), item.getContractCd().v()))
					.collect(Collectors.toList());
			
		}else {
			
			Optional<Company> comOpt = repo.getComanyInfoByCidContractCdAndAboAtr(cid.get(), contractCd, isAbolition ? 1 : 0);
			if (comOpt.isPresent()) {
				CompanyExportForKDP003 i =  new CompanyExportForKDP003(comOpt.get().getCompanyCode().v(),comOpt.get().getCompanyName().v(), comOpt.get().getCompanyId(), comOpt.get().getContractCd().v());
				result.add(i);
			}
		}
		return result;
		
		
	}

	@Override
	public String createCompanyId(String companyCode, String tenantCode) {
		return Company.createCompanyId(companyCode, tenantCode);
	}

	@Override
	public YearMonthPeriod getyearMonth(String cid, int year) {
		Optional<Company> company = this.repo.getComanyInfoByCid(cid);

		if (!company.isPresent()) {
			return null;
		}

		YearMonthPeriod result = company.get().getPeriodTheYear(year);

		return result;
	}
	
	//暦の年月から年月期間を取得する
	@Override
	public Optional<YearMonthPeriod> getYearMonthPeriodByCalendarYearmonth(String cid, YearMonth yearMonth){
		Optional<Company> company = this.repo.getComanyInfoByCid(cid);

		if (!company.isPresent()) {
			return Optional.empty();
		}

		return Optional.of(company.get().getYearMonthPeriodByCalendarYearmonth(yearMonth));
	}
}
