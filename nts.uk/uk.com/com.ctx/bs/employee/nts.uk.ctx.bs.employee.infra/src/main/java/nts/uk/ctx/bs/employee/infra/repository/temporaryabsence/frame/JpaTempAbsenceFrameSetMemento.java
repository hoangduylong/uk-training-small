/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.temporaryabsence.frame;

import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.NotUseAtr;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameName;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameNo;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameSetMemento;
import nts.uk.ctx.bs.employee.infra.entity.temporaryabsence.frame.BsystTempAbsenceFrame;

/**
 * The Class JpaTempAbsenceFrameSetMemento.
 */
public class JpaTempAbsenceFrameSetMemento implements TempAbsenceFrameSetMemento{

	/** The entity. */
	private BsystTempAbsenceFrame entity;
	
	/**
	 * Instantiates a new jpa temp absence frame set memento.
	 *
	 * @param entity the entity
	 */
	public JpaTempAbsenceFrameSetMemento(BsystTempAbsenceFrame entity) {
		super();
		this.entity = entity;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameSetMemento#setCompanyId(java.lang.String)
	 */
	@Override
	public void setCompanyId(String companyId) {
		entity.getBsystTempAbsenceFramePK().setCid(companyId);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameSetMemento#setTempAbsenceFrameNo(nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameNo)
	 */
	@Override
	public void setTempAbsenceFrameNo(TempAbsenceFrameNo tempAbsenceFrNo) {
		 entity.getBsystTempAbsenceFramePK().setTempAbsenceFrNo(tempAbsenceFrNo.v().shortValue() );
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameSetMemento#setUseClassification(nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.NotUseAtr)
	 */
	@Override
	public void setUseClassification(NotUseAtr useAtr) {
		entity.setUseAtr((short) useAtr.value);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameSetMemento#setTempAbsenceFrameName(nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameName)
	 */
	@Override
	public void setTempAbsenceFrameName(TempAbsenceFrameName tempAbsenceFrname) {
		entity.setTempAbsenceFrName(tempAbsenceFrname.v());
	}

}
