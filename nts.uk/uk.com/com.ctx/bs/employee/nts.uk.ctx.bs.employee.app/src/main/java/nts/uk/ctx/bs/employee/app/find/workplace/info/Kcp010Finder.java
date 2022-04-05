/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.workplace.info;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BusinessException;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.app.find.workplace.dto.Kcp010WorkplaceSearchData;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistory;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryItem;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryItemRepository;
import nts.uk.ctx.bs.employee.dom.workplace.affiliate.AffWorkplaceHistoryRepository;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceInformation;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceInformationRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class WorkplaceInfoFinder.
 */
@Stateless
public class Kcp010Finder {

	/** The wkp info repo. */
	@Inject
	private WorkplaceInformationRepository wkpInfoRepo;
	
	/** The workplace history repository. */
	@Inject
	private AffWorkplaceHistoryRepository workplaceHistoryRepo;
	
	/**AffWorkplaceHistoryItemRepository*/
	@Inject
	private AffWorkplaceHistoryItemRepository workplaceHistoryItemRepository;

	/**
	 * Find wkp info by workplaceCode
	 *
	 * @return the list
	 */
	public Optional<Kcp010WorkplaceSearchData> searchByWorkplaceCode(String workplaceCode, GeneralDate baseDate) {
		
		// find workplace info
		Optional<WorkplaceInformation> listWkpInfo = 
				wkpInfoRepo.getWkpNewByCdDate(AppContexts.user().companyId(), workplaceCode, baseDate);

		// check null or empty
		if (!listWkpInfo.isPresent()) {
			throw new BusinessException("Msg_7");
		}
		
		return Optional.of(Kcp010WorkplaceSearchData.builder()
				.workplaceId(listWkpInfo.get().getWorkplaceId())
				.code(listWkpInfo.get().getWorkplaceCode().v())
				.name(listWkpInfo.get().getWorkplaceDisplayName().v())
				.build());
	}
	
	public Optional<Kcp010WorkplaceSearchData> findBySid(String employeeId, GeneralDate baseDate) {
		String companyID = AppContexts.user().companyId();
		//get AffWorkplaceHistory
		Optional<AffWorkplaceHistory> affWrkPlc = workplaceHistoryRepo.getByEmpIdAndStandDate(employeeId, baseDate);
		if(!affWrkPlc.isPresent()) 
			return Optional.empty();
		
		//get AffWorkplaceHistoryItem
		String historyId = affWrkPlc.get().getHistoryItems().get(0).identifier();
		Optional<AffWorkplaceHistoryItem> affWrkPlcItem = workplaceHistoryItemRepository.getByHistId(historyId);
		if(!affWrkPlcItem.isPresent())
			return Optional.empty();
		
		// Get workplace info.
		Optional<WorkplaceInformation> optWorkplaceInfo = wkpInfoRepo.getWkpNewByIdDate(companyID, affWrkPlcItem.get().getWorkplaceId(), baseDate);

		// Check exist
		if (!optWorkplaceInfo.isPresent()) {
			return Optional.empty();
		}

		// Return workplace id
		WorkplaceInformation wkpInfo = optWorkplaceInfo.get();
		return Optional.of(Kcp010WorkplaceSearchData.builder()
				.workplaceId(wkpInfo.getWorkplaceId())
				.code(wkpInfo.getWorkplaceCode().v())
				.name(wkpInfo.getWorkplaceDisplayName().v()).build());
	}
}
