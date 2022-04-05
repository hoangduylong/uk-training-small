package nts.uk.ctx.bs.employee.app.find.workplace.affiliate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.xml.ws.EndpointReference;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.app.find.jobtitle.affiliate.AffJobTitleDto;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryItem;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistory;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryItem;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.pereg.app.ComboBoxObject;
import nts.uk.shr.pereg.app.find.PeregFinder;
import nts.uk.shr.pereg.app.find.PeregQuery;
import nts.uk.shr.pereg.app.find.PeregQueryByListEmp;
import nts.uk.shr.pereg.app.find.dto.DataClassification;
import nts.uk.shr.pereg.app.find.dto.GridPeregDomainBySidDto;
import nts.uk.shr.pereg.app.find.dto.GridPeregDomainDto;
import nts.uk.shr.pereg.app.find.dto.PeregDomainDto;

@Stateless
public class AffWorlplaceHistItemFinder implements PeregFinder<AffWorlplaceHistItemDto> {

	@Inject
	private AffWorkplaceHistoryItemRepository affWrkplcHistItemRepo;

	@Inject
	private AffWorkplaceHistoryRepository affWrkplcHistRepo;

	@Override
	public String targetCategoryCode() {
		return "CS00017";
	}

	@Override
	public Class<AffWorlplaceHistItemDto> dtoClass() {
		return AffWorlplaceHistItemDto.class;
	}

	@Override
	public DataClassification dataType() {
		return DataClassification.EMPLOYEE;
	}

	@Override
	public PeregDomainDto getSingleData(PeregQuery query) {
		return query.getInfoId() == null ? getByEmpIdAndStandDate(query.getEmployeeId(), query.getStandardDate())
				: getByHistId(query.getInfoId());
	}

	@Override
	public List<PeregDomainDto> getListData(PeregQuery query) {
		// TODO Auto-generated method stub
		return null;
	}

	public AffWorlplaceHistItemDto getByEmpIdAndStandDate(String employeeId, GeneralDate standDate) {
		Optional<AffWorkplaceHistory> affWrkplcHist = affWrkplcHistRepo.getByEmpIdAndStandDate(employeeId,
				standDate);
		if (affWrkplcHist.isPresent()) {

			Optional<AffWorkplaceHistoryItem> affWrkplcHistItem = affWrkplcHistItemRepo
					.getByHistId(affWrkplcHist.get().getHistoryItems().get(0).identifier());
			if (affWrkplcHistItem.isPresent()) {
				return AffWorlplaceHistItemDto.getFirstFromDomain(affWrkplcHist.get(), affWrkplcHistItem.get());
			}
		}
		return null;
	}

	private PeregDomainDto getByHistId(String historyId) {
		Optional<AffWorkplaceHistory> affWrkplcHist = affWrkplcHistRepo.getByHistId(historyId);
		if (affWrkplcHist.isPresent()) {
			Optional<AffWorkplaceHistoryItem> affWrkplcHistItem = affWrkplcHistItemRepo
					.getByHistId(affWrkplcHist.get().getHistoryItems().get(0).identifier());
			if (affWrkplcHistItem.isPresent()) {
				return AffWorlplaceHistItemDto.getFirstFromDomain(affWrkplcHist.get(), affWrkplcHistItem.get());
			}

		}
		return null;
	}

	@Override
	public List<ComboBoxObject> getListFirstItems(PeregQuery query) {
		
		Optional<AffWorkplaceHistory> affWrkplcHist = affWrkplcHistRepo
				.getByEmployeeIdDesc(AppContexts.user().companyId(), query.getEmployeeId());
		
		if (affWrkplcHist.isPresent()) {
			return affWrkplcHist.get().getHistoryItems().stream()
					.filter(x -> affWrkplcHistItemRepo.getByHistId(x.identifier()).isPresent())
					.map(x -> ComboBoxObject.toComboBoxObject(x.identifier(), x.start().toString(), 
							x.end().equals(GeneralDate.max()) 
							//&& query.getCtgType() == 3 
							? "" : x.end().toString()))
					.collect(Collectors.toList());
		}
		return new ArrayList<>();
	}

	@Override
	public List<GridPeregDomainDto> getAllData(PeregQueryByListEmp query) {

		List<GridPeregDomainDto> result = new ArrayList<>();

		List<String> sids = query.getEmpInfos().stream().map(c -> c.getEmployeeId()).collect(Collectors.toList());

		query.getEmpInfos().forEach(c -> {
			result.add(new GridPeregDomainDto(c.getEmployeeId(), c.getPersonId(), null));
		});

		Map<String, List<AffWorkplaceHistory>> affWorkPlaceHist = affWrkplcHistRepo
				.getWorkplaceHistoryByEmpIdsAndDate(query.getStandardDate(), sids).stream()
				.collect(Collectors.groupingBy(c -> c.getHistoryIds().get(0)));
		
		List<AffWorkplaceHistoryItem> historyItems = affWrkplcHistItemRepo
				.findByHistIds(new ArrayList<>(affWorkPlaceHist.keySet()));

		result.stream().forEach(c -> {
			Optional<AffWorkplaceHistoryItem> histItemOpt = historyItems.stream()
					.filter(histItem -> histItem.getEmployeeId().equals(c.getEmployeeId())).findFirst();
			if (histItemOpt.isPresent()) {
				List<AffWorkplaceHistory> affWorkplace = affWorkPlaceHist.get(histItemOpt.get().getHistoryId());
				if (affWorkplace != null) {
					c.setPeregDomainDto(affWorkplace.size() > 0
							? AffWorlplaceHistItemDto.getFirstFromDomain(affWorkplace.get(0), histItemOpt.get())
							: null);
				}
			}
		});
		return result;
	}

	// get data cps013
	@Override
	public List<GridPeregDomainBySidDto> getListData(PeregQueryByListEmp query) {
		
		String cid = AppContexts.user().companyId();

		List<GridPeregDomainBySidDto> result = new ArrayList<>();

		List<String> sids = query.getEmpInfos().stream().map(c -> c.getEmployeeId()).collect(Collectors.toList());

		query.getEmpInfos().forEach(c -> {
			result.add(new GridPeregDomainBySidDto(c.getEmployeeId(), c.getPersonId(), new ArrayList<>()));
		});
		
		List<DateHistoryItem> histories = affWrkplcHistRepo.getListByListSidsNoWithPeriod(cid, sids);
		
		List<String> histIds = histories.stream().map(c -> c.identifier()).collect(Collectors.toList());
		
		List<AffWorkplaceHistoryItem> histItems = affWrkplcHistItemRepo.findByHistIds(histIds);
		
		result.stream().forEach(c -> {
			List<AffWorkplaceHistoryItem> listHistItem = histItems.stream()
					.filter(emp -> emp.getEmployeeId().equals(c.getEmployeeId())).collect(Collectors.toList());
			
			if (!listHistItem.isEmpty()) {
				List<PeregDomainDto> listPeregDomainDto = new ArrayList<>();
				listHistItem.forEach(h -> {
					Optional<DateHistoryItem> dateHistoryItem = histories.stream().filter(i -> i.identifier().equals(h.getHistoryId())).findFirst();
					if (dateHistoryItem.isPresent()) {
						listPeregDomainDto.add(AffWorlplaceHistItemDto.getBaseOnDateHist(h, dateHistoryItem.get().start(), dateHistoryItem.get().end()));
					}
				});
				if (!listPeregDomainDto.isEmpty()) {
					c.setPeregDomainDto(listPeregDomainDto);
				}
			}
		});
		return result.stream().distinct().collect(Collectors.toList());
	}
}
