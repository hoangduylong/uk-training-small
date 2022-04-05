/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.temporaryabsence.frame;

import java.math.BigDecimal;

import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.NotUseAtr;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameGetMemento;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameName;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameNo;
import nts.uk.ctx.bs.employee.infra.entity.temporaryabsence.frame.BsystTempAbsenceFrame;

/**
 * The Class JpaTempAbsenceFrameGetMemento.
 */
public class JpaTempAbsenceFrameGetMemento implements TempAbsenceFrameGetMemento{
	
	/** The temp absence frame. */
	private BsystTempAbsenceFrame tempAbsenceFrame;

	/**
	 * Instantiates a new jpa temp absence frame get memento.
	 *
	 * @param tempAbsenceFrame the temp absence frame
	 */
	public JpaTempAbsenceFrameGetMemento(BsystTempAbsenceFrame tempAbsenceFrame) {
		super();
		this.tempAbsenceFrame = tempAbsenceFrame;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameGetMemento#getCompanyId()
	 */
	@Override
	public String getCompanyId() {
		return this.tempAbsenceFrame.getBsystTempAbsenceFramePK().getCid();
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameGetMemento#getTempAbsenceFrameNo()
	 */
	@Override
	public TempAbsenceFrameNo getTempAbsenceFrameNo() {
		return new TempAbsenceFrameNo(new BigDecimal(this.tempAbsenceFrame.getBsystTempAbsenceFramePK().getTempAbsenceFrNo()));
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameGetMemento#getUseClassification()
	 */
	@Override
	public NotUseAtr getUseClassification() {
		return NotUseAtr.valueOf((int) this.tempAbsenceFrame.getUseAtr()) ;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameGetMemento#getTempAbsenceFrameName()
	 */
	@Override
	public TempAbsenceFrameName getTempAbsenceFrameName() {
		return new TempAbsenceFrameName(this.tempAbsenceFrame.getTempAbsenceFrName());
	}

}
