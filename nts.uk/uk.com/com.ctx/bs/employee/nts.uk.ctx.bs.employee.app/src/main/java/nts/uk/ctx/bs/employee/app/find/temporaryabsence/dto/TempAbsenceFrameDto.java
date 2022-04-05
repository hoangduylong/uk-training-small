/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.temporaryabsence.dto;

import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.NotUseAtr;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameName;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameNo;
import nts.uk.ctx.bs.employee.dom.temporaryabsence.frame.TempAbsenceFrameSetMemento;

/**
 * The Class TempAbsenceFrameDto.
 */
public class TempAbsenceFrameDto implements TempAbsenceFrameSetMemento{

	/** The company id. */
	// 会社ID
	public String companyId;
	
	/** The temp absence fr no. */
	//休職休業枠NO
	public int tempAbsenceFrNo;
	
	/** The use classification. */
	//使用区分
	public short useClassification;
	
	/** The temp absence fr name. */
	//休職休業枠名称
	public String tempAbsenceFrName;
	
	@Override
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	@Override
	public void setTempAbsenceFrameNo(TempAbsenceFrameNo tempAbsenceFrNo) {
		this.tempAbsenceFrNo = tempAbsenceFrNo.v().intValue();
	}

	@Override
	public void setUseClassification(NotUseAtr useAtr) {
		this.useClassification = (short) useAtr.value;
	}

	@Override
	public void setTempAbsenceFrameName(TempAbsenceFrameName tempAbsenceFrname) {
		this.tempAbsenceFrName = tempAbsenceFrname.v();
	}

}
