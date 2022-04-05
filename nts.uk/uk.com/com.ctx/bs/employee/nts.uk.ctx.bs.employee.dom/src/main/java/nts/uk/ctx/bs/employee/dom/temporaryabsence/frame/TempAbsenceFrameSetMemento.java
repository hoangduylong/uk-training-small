/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.temporaryabsence.frame;

/**
 * The Interface TempAbsenceFrameSetMemento.
 */
public interface TempAbsenceFrameSetMemento {
	
	/**
	 * Sets the company id.
	 *
	 * @param companyId the new company id
	 */
	public void setCompanyId(String companyId);

	/**
	 * Sets the temp absence frame no.
	 *
	 * @param tempAbsenceFrNo the new temp absence frame no
	 */
	public void setTempAbsenceFrameNo(TempAbsenceFrameNo tempAbsenceFrNo);
	
	/**
	 * Sets the use classification.
	 *
	 * @param useAtr the new use classification
	 */
	public void setUseClassification(NotUseAtr useAtr);
	
	/**
	 * Sets the temp absence frame name.
	 *
	 * @param tempAbsenceFrname the new temp absence frame name
	 */
	public void setTempAbsenceFrameName(TempAbsenceFrameName tempAbsenceFrname);
}
