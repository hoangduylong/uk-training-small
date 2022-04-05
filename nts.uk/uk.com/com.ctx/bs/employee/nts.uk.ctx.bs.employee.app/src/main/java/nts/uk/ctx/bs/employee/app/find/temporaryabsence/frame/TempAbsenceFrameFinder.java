/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.temporaryabsence.frame;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.app.find.temporaryabsence.dto.TempAbsenceFrameDto;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrame;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceRepositoryFrame;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class TempAbsenceFrameFinder.
 */
@Stateless
public class TempAbsenceFrameFinder {
	
	/** The taf repo. */
	@Inject
	private TempAbsenceRepositoryFrame tafRepo;
	
	/**
	 * Find by TAF pk.
	 *
	 * @param cId the c id
	 * @param tempAbsenceFrameNo the temp absence frame no
	 * @return the temp absence frame dto
	 */
	public TempAbsenceFrameDto findByTAFPk(String cId, short tempAbsenceFrameNo) {
		
		cId = AppContexts.user().companyId();
		
		TempAbsenceFrame tempAbsenceFrame = tafRepo.findByTempAbsenceFramePk(cId, tempAbsenceFrameNo);
		if (tempAbsenceFrame != null) {
			TempAbsenceFrameDto dto = new TempAbsenceFrameDto();
			tempAbsenceFrame.saveToMemento(dto);
			return dto;
		}
		return null;
	}
	
	/**
	 * Find by cid.
	 *
	 * @param cId the c id
	 * @return the list
	 */
	public List<TempAbsenceFrameDto> findByCid() {
		
		String cId = AppContexts.user().companyId();
		
		List<TempAbsenceFrame> lstTempAbsenceFrame = tafRepo.findByCid(cId);
		
		// check null or empty
		if (CollectionUtil.isEmpty(lstTempAbsenceFrame)) {
			return new ArrayList<>();
		}
		
		// convert to Dto
		return lstTempAbsenceFrame.stream()
				.map(item -> {
					TempAbsenceFrameDto dto = new TempAbsenceFrameDto();
					item.saveToMemento(dto);
					return dto;
				})
//				.collect(Collectors.toList());
				.collect(Collectors.toCollection(ArrayList::new));
	}
}