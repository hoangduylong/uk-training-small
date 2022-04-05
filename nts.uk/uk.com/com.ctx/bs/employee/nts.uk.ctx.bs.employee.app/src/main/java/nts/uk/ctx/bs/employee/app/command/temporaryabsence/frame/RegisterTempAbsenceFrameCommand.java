/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.temporaryabsence.frame;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.bs.employee.app.command.temporaryabsence.dto.TempAbsenceFrameDto;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.NotUseAtr;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrame;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameGetMemento;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameName;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameNo;

/**
 * The Class RegisterTempAbsenceFrameCommand.
 */

@Getter
@Setter
public class RegisterTempAbsenceFrameCommand {
	
	/** The dto. */
	private List<TempAbsenceFrameDto> dto;
	
	/**
	 * To domain.
	 *
	 * @return the list
	 */
	public List<TempAbsenceFrame> toDomain() {
		List<TempAbsenceFrame> lstFrame = new ArrayList<>();
		for (TempAbsenceFrameDto dto: dto) {
			lstFrame.add(new TempAbsenceFrame(new TempAbsenceFrameGetMementoImpl(dto)));
		}
		return lstFrame;
	}

	/**
	 * The Class TempAbsenceFrameGetMementoImpl.
	 */
	public class TempAbsenceFrameGetMementoImpl implements TempAbsenceFrameGetMemento {

		/** The temp absence frame command. */
		private TempAbsenceFrameDto tempAbsenceFrameCommand;
		
		/**
		 * Instantiates a new temp absence frame get memento impl.
		 *
		 * @param tempAbsenceFrameCommand the temp absence frame command
		 */
		public TempAbsenceFrameGetMementoImpl(TempAbsenceFrameDto tempAbsenceFrameCommand) {
			super();
			this.tempAbsenceFrameCommand = tempAbsenceFrameCommand;
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameGetMemento#getCompanyId()
		 */
		@Override
		public String getCompanyId() {
			return this.tempAbsenceFrameCommand.getCompanyId();
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameGetMemento#getTempAbsenceFrameNo()
		 */
		@Override
		public TempAbsenceFrameNo getTempAbsenceFrameNo() {
			 return new TempAbsenceFrameNo(BigDecimal.valueOf(this.tempAbsenceFrameCommand.getTempAbsenceFrNo()));
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameGetMemento#getUseClassification()
		 */
		@Override
		public NotUseAtr getUseClassification() {
			return NotUseAtr.valueOf((int) this.tempAbsenceFrameCommand.getUseClassification()); 
		}

		/* (non-Javadoc)
		 * @see nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameGetMemento#getTempAbsenceFrameName()
		 */
		@Override
		public TempAbsenceFrameName getTempAbsenceFrameName() {
			return new TempAbsenceFrameName(this.tempAbsenceFrameCommand.getTempAbsenceFrName());
		}
	}	
}
