/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.adapter.status.employment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatusOfEmploymentImport {
	
	/** The employee id. */
	// 社員ID
	private String employeeId;
	
	/** The referene date. */
	//基準日
	private GeneralDate refereneDate;
	
	/** The status of employment. */
	//在職状態
	private int statusOfEmployment;
	
	/** The temp absence fr no. */
	//休職休業枠NO
	private int tempAbsenceFrNo;
}
