/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.ac.find.login;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.gateway.dom.loginold.adapter.loginrecord.LoginRecordAdapter;
import nts.uk.ctx.sys.gateway.dom.loginold.adapter.loginrecord.LoginRecordInfor;
import nts.uk.ctx.sys.log.pub.loginrecord.LoginRecordDto;
import nts.uk.ctx.sys.log.pub.loginrecord.LoginRecordPublisher;

/**
 * The Class LoginRecordAdapterImpl.
 */
@Stateless
public class LoginRecordAdapterImpl implements LoginRecordAdapter {

	/** The login record publisher. */
	@Inject
	private LoginRecordPublisher loginRecordPublisher;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.gateway.dom.login.adapter.loginrecord.LoginRecordAdapter#
	 * addLoginRecord(nts.uk.ctx.sys.gateway.dom.login.adapter.loginrecord.
	 * LoginRecordDto)
	 */
	@Override
	public void addLoginRecord(LoginRecordInfor infor) {

		//convert to dto
		LoginRecordDto dto = new LoginRecordDto(infor.operationId, infor.loginMethod, infor.loginStatus,
				infor.lockStatus, infor.url, infor.remarks);

		//add to domain LoginRecord
		this.loginRecordPublisher.addLoginRecord(dto);
	}

}
