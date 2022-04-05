/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.temporaryabsence.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TempAbsenceFrameDto {
	
	/** The company id. */
	// 会社ID
	private String companyId;
	
	/** The temp absence fr no. */
	//休職休業枠NO
	private int tempAbsenceFrNo;
	
	/** The use classification. */
	//使用区分
	private short useClassification;
	
	/** The temp absence fr name. */
	//休職休業枠名称
	private String tempAbsenceFrName;
}