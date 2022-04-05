/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pub.service;

import java.util.List;

import nts.arc.time.GeneralDate;

/**
 * The Interface WorkPlaceManagerPub.
 */
public interface WorkPlaceManagerPub {
	
	/**
	 * Gets the wkp manager by emp id and base date.
	 *
	 * @param sid the sid
	 * @param baseDate the base date
	 * @return the wkp manager by emp id and base date
	 */
	List<String> getWkpManagerByEmpIdAndBaseDate(String sid, GeneralDate baseDate);
}
