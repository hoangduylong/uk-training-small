/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.workplace;

import lombok.Builder;
import lombok.Data;

/* (non-Javadoc)
 * @see java.lang.Object#toString()
 */
@Data
@Builder
//職場情報
public class WorkPlaceInfoExport {
	
	/** The workplace id. */
	// 職場ID
	private String workplaceId;
	
	/** The work place name. */
	//職場名称
	private String workPlaceName;
}
