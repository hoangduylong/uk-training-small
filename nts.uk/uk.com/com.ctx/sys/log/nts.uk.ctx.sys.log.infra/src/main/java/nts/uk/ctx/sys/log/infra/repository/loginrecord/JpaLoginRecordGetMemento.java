/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.log.infra.repository.loginrecord;

import java.util.Optional;

import nts.uk.ctx.sys.log.dom.loginrecord.LoginMethod;
import nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordGetMemento;
import nts.uk.ctx.sys.log.dom.loginrecord.LoginStatus;
import nts.uk.ctx.sys.log.infra.entity.loginrecord.SrcdtLoginCorrection;

/**
 * The Class JpaPasswordChangeLogGetMemento.
 */
public class JpaLoginRecordGetMemento implements LoginRecordGetMemento {
	
	/** The Constant TRUE_VALUE. */
	public static final int TRUE_VALUE = 1;

	/** The entity. */
	private SrcdtLoginCorrection entity;

	/**
	 * Instantiates a new jpa login record get memento.
	 *
	 * @param entity the entity
	 */
	public JpaLoginRecordGetMemento(SrcdtLoginCorrection entity) {
		this.entity = entity;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordGetMemento#getOperationId()
	 */
	@Override
	public String getOperationId() {
		return this.entity.getSrcdtLoginRecordPK().getOperationId();
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordGetMemento#getLoginMethod()
	 */
	@Override
	public LoginMethod getLoginMethod() {
		return LoginMethod.valueOf(this.entity.getLoginMethod());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordGetMemento#getLoginStatus()
	 */
	@Override
	public LoginStatus getLoginStatus() {
		return LoginStatus.valueOf(this.entity.getLoginStatus());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordGetMemento#getLockStatus()
	 */
	@Override
	public boolean getLockStatus() {
		return this.entity.getLockStatus() == TRUE_VALUE;
	}
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordGetMemento#getUrl()
	 */
	@Override
	public Optional<String> getUrl() {
		return Optional.ofNullable(this.entity.getUrl());
	}
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordGetMemento#getRemarks()
	 */
	@Override
	public Optional<String> getRemarks() {
		return Optional.ofNullable(this.entity.getRemarks());
	}

}
