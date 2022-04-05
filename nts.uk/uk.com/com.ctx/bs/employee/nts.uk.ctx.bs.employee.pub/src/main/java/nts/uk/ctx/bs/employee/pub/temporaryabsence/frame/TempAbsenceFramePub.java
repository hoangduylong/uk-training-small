package nts.uk.ctx.bs.employee.pub.temporaryabsence.frame;

import java.util.List;

/**
 * The Interface TempAbsenceFramePub.
 *
 * @author NWS_LienPTK
 */
public interface TempAbsenceFramePub {

	/**
	 * Find with use state.
	 *
	 * @param cId the c id
	 * @param useAtr the use atr
	 * @return the list
	 */
	List<TempAbsenceFrameDto> findWithUseState(String cId, Integer useAtr);
}
