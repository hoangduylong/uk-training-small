/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.otreferset;

import java.util.Optional;

/**
 * The Interface OvertimeReferSetRepository.
 */
public interface OvertimeReferSetRepository {
	
	/**
	 * Gets the overtime refer set.
	 *
	 * @param companyID the company ID
	 * @return the overtime refer set
	 */
	Optional<OvertimeReferSet> getOvertimeReferSet(String companyID);
}

