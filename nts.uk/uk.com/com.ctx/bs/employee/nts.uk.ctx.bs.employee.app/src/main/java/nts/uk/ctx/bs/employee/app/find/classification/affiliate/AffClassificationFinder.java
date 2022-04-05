/**
 * 
 */
package nts.uk.ctx.bs.employee.app.find.classification.affiliate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistItem;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistItemRepository;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistory;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistoryRepository;
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
 * @author danpv
 *
 */
@Stateless
public class AffClassificationFinder implements PeregFinder<AffClassificationDto> {

	@Inject
	private AffClassHistoryRepository affClassHistRepo;

	@Inject
	private AffClassHistItemRepository affClassHistItemRepo;

	@Override
	public String targetCategoryCode() {
		return "CS00004";
	}

	@Override
	public Class<AffClassificationDto> dtoClass() {
		return AffClassificationDto.class;
	}

	@Override
	public DataClassification dataType() {
		return DataClassification.EMPLOYEE;
	}

	@Override
	public AffClassificationDto getSingleData(PeregQuery query) {
		Optional<AffClassHistItem> histItem;
		Optional<DateHistoryItem> history = Optional.empty();
		if (query.getInfoId() != null) {
			history = affClassHistRepo.getByHistoryId(query.getInfoId());
		} else if (query.getStandardDate() != null){
			history = affClassHistRepo.getByEmpIdAndStandardDate(query.getEmployeeId(), query.getStandardDate());
		}
		if (history.isPresent()) {
			histItem = affClassHistItemRepo.getByHistoryId(history.get().identifier());
			if (histItem.isPresent()) {
				return AffClassificationDto.createFromDomain(histItem.get(), history.get());
			}
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

		Optional<AffClassHistory> affClassHistory = affClassHistRepo
				.getByEmployeeIdDesc(AppContexts.user().companyId(), query.getEmployeeId());

		if (affClassHistory.isPresent()) {
			return affClassHistory.get().getPeriods().stream()
					.filter(x -> affClassHistItemRepo.getByHistoryId(x.identifier()).isPresent())
					.map(x -> ComboBoxObject.toComboBoxObject(x.identifier(), x.start().toString(), 
							x.end().equals(GeneralDate.max()) 
							//&& query.getCtgType() == 3
							?"":x.end().toString()))
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

		List<DateHistoryItem> histories = affClassHistRepo.getByEmployeeListWithPeriod(cid, sids,
				query.getStandardDate());
		
		List<String> histIds = histories.stream().map(c -> c.identifier()).collect(Collectors.toList());
		
		List<AffClassHistItem> histItems = affClassHistItemRepo.getByHistoryIds(histIds);

		result.stream().forEach(c -> {
			Optional<AffClassHistItem> histItemOpt = histItems.stream()
					.filter(emp -> emp.getEmployeeId().equals(c.getEmployeeId())).findFirst();
			if (histItemOpt.isPresent()) {
				Optional<DateHistoryItem> dateHistOpt = histories.stream()
						.filter(his -> his.identifier().equals(histItemOpt.get().getHistoryId())).findFirst();
				c.setPeregDomainDto(AffClassificationDto.createFromDomain(histItemOpt.get(), dateHistOpt.get()));
			}
		});

		return result.stream().distinct().collect(Collectors.toList());
	}

	@Override
	public List<GridPeregDomainBySidDto> getListData(PeregQueryByListEmp query) {
		String cid = AppContexts.user().companyId();

		List<GridPeregDomainBySidDto> result = new ArrayList<>();

		List<String> sids = query.getEmpInfos().stream().map(c -> c.getEmployeeId()).collect(Collectors.toList());

		query.getEmpInfos().forEach(c -> {
			result.add(new GridPeregDomainBySidDto(c.getEmployeeId(), c.getPersonId(), new ArrayList<>()));
		});
		
		List<DateHistoryItem> histories = affClassHistRepo.getByEmployeeListNoWithPeriod(cid, sids);
		
		List<String> histIds = histories.stream().map(c -> c.identifier()).collect(Collectors.toList());
		
		List<AffClassHistItem> histItems = affClassHistItemRepo.getByHistoryIds(histIds);
		
		result.stream().forEach(c -> {
			List<AffClassHistItem> listHistItem = histItems.stream()
					.filter(emp -> emp.getEmployeeId().equals(c.getEmployeeId())).collect(Collectors.toList());
			
			if (!listHistItem.isEmpty()) {
				List<PeregDomainDto> listPeregDomainDto = new ArrayList<>();
				listHistItem.forEach(h -> {
					Optional<DateHistoryItem> dateHistoryItem = histories.stream().filter(i -> i.identifier().equals(h.getHistoryId())).findFirst();
					if (dateHistoryItem.isPresent()) {
						listPeregDomainDto.add(AffClassificationDto.createFromDomain(h, dateHistoryItem.get()));
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
