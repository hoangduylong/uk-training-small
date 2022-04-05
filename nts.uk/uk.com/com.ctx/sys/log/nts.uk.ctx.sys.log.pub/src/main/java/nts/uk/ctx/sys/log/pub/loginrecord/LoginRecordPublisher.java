/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.log.pub.loginrecord;

/**
 * The Interface LoginRecordPublisher.
 */
public interface LoginRecordPublisher {

	/**
	 * Adds the login record.
	 *
	 * @param loginRecord the login record
	 */
	void addLoginRecord(LoginRecordDto loginRecord);
}
