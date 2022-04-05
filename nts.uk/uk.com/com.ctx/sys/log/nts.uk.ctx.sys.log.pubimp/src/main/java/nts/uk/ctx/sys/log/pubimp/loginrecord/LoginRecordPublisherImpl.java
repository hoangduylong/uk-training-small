/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.log.pubimp.loginrecord;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.log.dom.loginrecord.LoginRecord;
import nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordRepository;
import nts.uk.ctx.sys.log.pub.loginrecord.LoginRecordDto;
import nts.uk.ctx.sys.log.pub.loginrecord.LoginRecordPublisher;

/**
 * The Class LoginRecordPublisherImpl.
 */
@Stateless
public class LoginRecordPublisherImpl implements LoginRecordPublisher {

	/** The login record repo. */
	@Inject
	private LoginRecordRepository loginRecordRepo;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.log.pub.loginrecord.LoginRecordPublisher#addLoginRecord(
	 * nts.uk.ctx.sys.log.pub.loginrecord.LoginRecordDto)
	 */
	@Override
	public void addLoginRecord(LoginRecordDto loginRecord) {
		this.loginRecordRepo.add(this.toDomain(loginRecord));
	}

	/**
	 * To domain.
	 *
	 * @param loginRecord
	 *            the login record
	 * @return the login record
	 */
	private LoginRecord toDomain(LoginRecordDto loginRecord) {
		return LoginRecord.createFromJavaType(loginRecord.operationId, loginRecord.loginMethod,
				loginRecord.loginStatus, loginRecord.lockStatus, loginRecord.url,
				loginRecord.remarks);
	}

}
