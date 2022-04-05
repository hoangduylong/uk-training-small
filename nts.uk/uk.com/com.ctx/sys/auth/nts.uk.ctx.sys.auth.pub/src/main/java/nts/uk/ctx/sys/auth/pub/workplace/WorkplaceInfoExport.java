/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pub.workplace;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class WorkplaceInfoExport {

	/** The work place ID. */
	public List<String> lstWorkPlaceID;

	/** The employee range. */
	public Integer employeeRange;

	/**
	 * Instantiates a new workplace info export.
	 */
	public WorkplaceInfoExport() {
		super();
		this.lstWorkPlaceID = new ArrayList<>();
	}

}
