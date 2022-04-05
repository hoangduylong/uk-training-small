/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.workplace;

import java.util.List;

import lombok.Builder;
import lombok.Data;

/**
 * The Class WorkplaceInfoHistExport.
 */
@Data
@Builder
// 指定期間の職場履歴
public class WkpHistWithPeriodExport {
	
	/** The wkp code. */
	// 職場ID
	private String wkpId;

	/** The wkp display name. */
	// 職場情報履歴一覧
	private List<WkpInfoHistExport> wkpInfoHistLst;
}
