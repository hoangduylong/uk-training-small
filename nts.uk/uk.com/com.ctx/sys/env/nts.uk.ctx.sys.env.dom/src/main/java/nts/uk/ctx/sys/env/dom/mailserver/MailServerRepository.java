/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.dom.mailserver;

import java.util.Optional;

/**
 * The Interface MailServerRepository.
 */
public interface MailServerRepository {

	/**
	 * Find by.
	 *
	 * @param companyId the company id
	 * @return the optional
	 */
	Optional<MailServer> findBy(String companyId);
	
	/**
	 * Adds the.
	 *
	 * @param mailSetting
	 */
	void add(MailServer mailSetting);
	
	/**
	 * Update.
	 *
	 * @param mailSetting
	 */
	void update(MailServer mailSetting);
}
