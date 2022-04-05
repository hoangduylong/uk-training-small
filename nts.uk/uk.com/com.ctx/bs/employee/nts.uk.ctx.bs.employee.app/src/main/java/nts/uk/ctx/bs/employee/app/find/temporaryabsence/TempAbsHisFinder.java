package nts.uk.ctx.bs.employee.app.find.temporaryabsence;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsHistRepository;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsItemRepository;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHisItem;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.TempAbsenceHistory;
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

/**
 * Temporary absence finder
 */

@Stateless
public class TempAbsHisFinder implements PeregFinder<TempAbsHisItemDto> {

	@Inject
	private TempAbsItemRepository tempAbsItemRepo;

	@Inject
	private TempAbsHistRepository tempAbsHistRepo;

	@Override
	public String targetCategoryCode() {
		return "CS00018";
	}

	@Override
	public Class<TempAbsHisItemDto> dtoClass() {
		return TempAbsHisItemDto.class;
	}

	@Override
	public DataClassification dataType() {
		return DataClassification.EMPLOYEE;
	}

	@Override
	public PeregDomainDto getSingleData(PeregQuery query) {
		Optional<TempAbsenceHisItem> histItemOpt;
		Optional<DateHistoryItem> historyOpt;
		if (query.getInfoId() != null) {
			historyOpt = tempAbsHistRepo.getByHistId(query.getInfoId());
		} else {
			historyOpt = tempAbsHistRepo.getItemByEmpIdAndStandardDate(query.getEmployeeId(), query.getStandardDate());

		}
		if (historyOpt.isPresent()) {
			histItemOpt = tempAbsItemRepo.getItemByHitoryID(historyOpt.get().identifier());
			return TempAbsHisItemDto.createFromDomain(historyOpt.get(), histItemOpt.get());
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.shr.pereg.app.find.PeregFinder#getListData(nts.uk.shr.pereg.app.
	 * find.PeregQuery)
	 */
	@Override
	public List<PeregDomainDto> getListData(PeregQuery query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ComboBoxObject> getListFirstItems(PeregQuery query) {

		Optional<TempAbsenceHistory> history = tempAbsHistRepo.getByEmployeeIdDesc(AppContexts.user().companyId(),
				query.getEmployeeId());
		if (history.isPresent()) {
			return history.get().getDateHistoryItems().stream()
					.filter(item -> tempAbsItemRepo.getItemByHitoryID(item.identifier()).isPresent())
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
		String cid = AppContexts.user().companyId();

		List<GridPeregDomainDto> result = new ArrayList<>();

		List<String> sids = query.getEmpInfos().stream().map(c -> c.getEmployeeId()).collect(Collectors.toList());

		query.getEmpInfos().forEach(c -> {
			result.add(new GridPeregDomainDto(c.getEmployeeId(), c.getPersonId(), null));
		});
		List<DateHistoryItem> dateHistItemLst = this.tempAbsHistRepo.getAllBySidAndCidAndBaseDate(cid, sids,
				query.getStandardDate());

		List<TempAbsenceHisItem> hisItemLst = this.tempAbsItemRepo
				.getItemByHitoryIdList(dateHistItemLst.stream().map(c -> c.identifier()).collect(Collectors.toList()));

		result.stream().forEach(c -> {
			Optional<TempAbsenceHisItem> histItemOpt = hisItemLst.stream()
					.filter(emp -> emp.getEmployeeId().equals(c.getEmployeeId())).findFirst();
			if (histItemOpt.isPresent()) {
				Optional<DateHistoryItem> dateHistItemOpt = dateHistItemLst.stream()
						.filter(date -> date.identifier().equals(histItemOpt.get().getHistoryId())).findFirst();
				c.setPeregDomainDto(dateHistItemOpt.isPresent() == true
						? TempAbsHisItemDto.createFromDomain(dateHistItemOpt.get(), histItemOpt.get())
						: null);
			}

		});

		return result;
	}

	@Override
	public List<GridPeregDomainBySidDto> getListData(PeregQueryByListEmp query) {
		String cid = AppContexts.user().companyId();

		List<GridPeregDomainBySidDto> result = new ArrayList<>();

		List<String> sids = query.getEmpInfos().stream().map(c -> c.getEmployeeId()).collect(Collectors.toList());

		query.getEmpInfos().forEach(c -> {
			result.add(new GridPeregDomainBySidDto(c.getEmployeeId(), c.getPersonId(), new ArrayList<>()));
		});
		
		List<DateHistoryItem> histories = tempAbsHistRepo.getListByListSidsNoWithPeriod(cid, sids);
		
		List<String> histIds = histories.stream().map(c -> c.identifier()).collect(Collectors.toList());
		
		List<TempAbsenceHisItem> histItems = tempAbsItemRepo.getItemByHitoryIdList(histIds);
		
		result.stream().forEach(c -> {
			List<TempAbsenceHisItem> listHistItem = histItems.stream()
					.filter(emp -> emp.getEmployeeId().equals(c.getEmployeeId())).collect(Collectors.toList());
			
			if (!listHistItem.isEmpty()) {
				List<PeregDomainDto> listPeregDomainDto = new ArrayList<>();
				listHistItem.forEach(h -> {
					Optional<DateHistoryItem> dateHistoryItem = histories.stream().filter(i -> i.identifier().equals(h.getHistoryId())).findFirst();
					if (dateHistoryItem.isPresent()) {
						listPeregDomainDto.add(TempAbsHisItemDto.createFromDomain(dateHistoryItem.get(), h));
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
