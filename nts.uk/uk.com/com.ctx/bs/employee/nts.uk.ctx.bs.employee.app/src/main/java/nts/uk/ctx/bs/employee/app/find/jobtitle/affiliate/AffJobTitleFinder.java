/**
 * 
 */
package nts.uk.ctx.bs.employee.app.find.jobtitle.affiliate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.app.find.classification.affiliate.AffClassificationDto;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistItem;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistory;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryItem;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.jobtitle.affiliate.AffJobTitleHistoryRepository;
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
public class AffJobTitleFinder implements PeregFinder<AffJobTitleDto> {

	@Inject
	private AffJobTitleHistoryItemRepository affJobTitleItemRepo;

	@Inject
	private AffJobTitleHistoryRepository affJobTitleRepo;

	@Override
	public String targetCategoryCode() {
		return "CS00016";
	}

	@Override
	public Class<AffJobTitleDto> dtoClass() {
		return AffJobTitleDto.class;
	}

	@Override
	public DataClassification dataType() {
		return DataClassification.EMPLOYEE;
	}

	@Override
	public PeregDomainDto getSingleData(PeregQuery query) {
		
		Optional<AffJobTitleHistory> historyOpt;
		if ( query.getInfoId() != null ) {
			historyOpt = affJobTitleRepo.getByHistoryId(query.getInfoId());
		} else {
			historyOpt = affJobTitleRepo.getByEmpIdAndStandardDate(query.getEmployeeId(), query.getStandardDate());
		}
		
		if ( historyOpt.isPresent()) {
			Optional<AffJobTitleHistoryItem> histItemOpt = affJobTitleItemRepo
					.findByHitoryId(historyOpt.get().getHistoryItems().get(0).identifier());
			if ( histItemOpt.isPresent()) {
				return AffJobTitleDto.createFromDomain(histItemOpt.get(), historyOpt.get());
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
		Optional<AffJobTitleHistory> historyOpt = affJobTitleRepo.getListBySidDesc(AppContexts.user().companyId(),
				query.getEmployeeId());
		if (historyOpt.isPresent()) {
			return historyOpt.get().getHistoryItems().stream()
					.filter(x -> affJobTitleItemRepo.findByHitoryId(x.identifier()).isPresent())
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
		// key - sid , value - pid getEmployeeId getPersonId
		List<String> sids = query.getEmpInfos().stream().map(c -> c.getEmployeeId()).collect(Collectors.toList());

		query.getEmpInfos().forEach(c -> {
			result.add(new GridPeregDomainDto(c.getEmployeeId(), c.getPersonId(), null));
		});

		List<AffJobTitleHistory> affJobLst = affJobTitleRepo.getListByListHidSid(sids, query.getStandardDate());

		List<String> histIds = affJobLst.stream().map(c -> c.getHistoryIds().get(0)).collect(Collectors.toList());

		List<AffJobTitleHistoryItem> histItems = affJobTitleItemRepo.findByHitoryIds(histIds);

		result.stream().forEach(c -> {
			Optional<AffJobTitleHistoryItem> histItemOpt = histItems.stream()
					.filter(emp -> emp.getEmployeeId().equals(c.getEmployeeId())).findFirst();
			if (histItemOpt.isPresent()) {
				Optional<AffJobTitleHistory> affJobTittleOpt = affJobLst.stream()
						.filter(his -> his.getHistoryIds().get(0).equals(histItemOpt.get().getHistoryId())).findFirst();
				if (affJobTittleOpt.isPresent()) {
					c.setPeregDomainDto(AffJobTitleDto.createFromDomain(histItemOpt.get(), affJobTittleOpt.get()));
				}
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
		
		List<DateHistoryItem> histories = affJobTitleRepo.getListByListSidsNoWithPeriod(cid, sids);
		
		List<String> histIds = histories.stream().map(c -> c.identifier()).collect(Collectors.toList());
		
		List<AffJobTitleHistoryItem> histItems = affJobTitleItemRepo.findByHitoryIds(histIds);
		
		result.stream().forEach(c -> {
			List<AffJobTitleHistoryItem> listHistItem = histItems.stream()
					.filter(emp -> emp.getEmployeeId().equals(c.getEmployeeId())).collect(Collectors.toList());
			
			if (!listHistItem.isEmpty()) {
				List<PeregDomainDto> listPeregDomainDto = new ArrayList<>();
				listHistItem.forEach(h -> {
					Optional<DateHistoryItem> dateHistoryItem = histories.stream().filter(i -> i.identifier().equals(h.getHistoryId())).findFirst();
					if (dateHistoryItem.isPresent()) {
						listPeregDomainDto.add(AffJobTitleDto.createFromDomain(h, dateHistoryItem.get()));
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
