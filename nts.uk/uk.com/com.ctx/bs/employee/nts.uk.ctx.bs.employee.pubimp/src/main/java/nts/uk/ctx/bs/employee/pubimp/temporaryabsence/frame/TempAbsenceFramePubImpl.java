package nts.uk.ctx.bs.employee.pubimp.temporaryabsence.frame;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceRepositoryFrame;
import nts.uk.ctx.bs.employee.pub.temporaryabsence.frame.TempAbsenceFrameDto;
import nts.uk.ctx.bs.employee.pub.temporaryabsence.frame.TempAbsenceFramePub;

/**
 * The Class TempAbsenceFramePubImpl.
 * 
 * @author NWS_LienPTK
 */
@Stateless
public class TempAbsenceFramePubImpl implements TempAbsenceFramePub {
	
	/** The temp absence repository frame. */
	@Inject
	private TempAbsenceRepositoryFrame tempAbsenceRepositoryFrame;

	/**
	 * Find with use state.
	 *
	 * @param cId the c id
	 * @param useAtr the use atr
	 * @return the list
	 */
	@Override
	public List<TempAbsenceFrameDto> findWithUseState(String cId, Integer useAtr) {
		return this.tempAbsenceRepositoryFrame.findWithUseState(cId, useAtr).stream()
				.map(t -> new TempAbsenceFrameDto(t.getCompanyId()
						, t.getTempAbsenceFrNo().v().intValue()
						, t.getUseClassification().value
						, t.getTempAbsenceFrName().v()))
				.collect(Collectors.toList());
	}

}
