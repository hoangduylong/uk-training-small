/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.temporaryabsence.frame;

/**
 * The Interface TempAbsenceFrameGetMemento.
 */
public interface TempAbsenceFrameGetMemento {
	
	/**
	 * Gets the company id.
	 *
	 * @return the company id
	 */
	String getCompanyId();

	/**
	 * Gets the temp absence frame no.
	 *
	 * @return the temp absence frame no
	 */
	TempAbsenceFrameNo getTempAbsenceFrameNo();
	
	/**
	 * Gets the use classification.
	 *
	 * @return the use classification
	 */
	NotUseAtr getUseClassification();
	
	/**
	 * Gets the temp absence frame name.
	 *
	 * @return the temp absence frame name
	 */
	TempAbsenceFrameName getTempAbsenceFrameName();
}
