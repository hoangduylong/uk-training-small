/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.log.infra.repository.loginrecord;

import java.util.Optional;

import nts.uk.ctx.sys.log.dom.loginrecord.LoginMethod;
import nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordSetMemento;
import nts.uk.ctx.sys.log.dom.loginrecord.LoginStatus;
import nts.uk.ctx.sys.log.infra.entity.loginrecord.SrcdtLoginCorrection;
import nts.uk.ctx.sys.log.infra.entity.loginrecord.SrcdtLoginRecordPK;

/**
 * The Class JpaPasswordChangeLogSetMemento.
 */
public class JpaLoginRecordSetMemento implements LoginRecordSetMemento {

	/** The entity. */
	private SrcdtLoginCorrection entity;

	/**
	 * Instantiates a new jpa login record set memento.
	 *
	 * @param entity the entity
	 */
	public JpaLoginRecordSetMemento(SrcdtLoginCorrection entity) {
		if (entity.getSrcdtLoginRecordPK() == null) {
			entity.setSrcdtLoginRecordPK(new SrcdtLoginRecordPK());
		}
		this.entity = entity;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordSetMemento#setOperationId(java.lang.String)
	 */
	@Override
	public void setOperationId(String operationId) {
		this.entity.getSrcdtLoginRecordPK().setOperationId(operationId);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordSetMemento#setLoginMethod(nts.uk.ctx.sys.log.dom.loginrecord.LoginMethod)
	 */
	@Override
	public void setLoginMethod(LoginMethod loginMethod) {
		this.entity.setLoginMethod(loginMethod.value);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordSetMemento#setLoginStatus(nts.uk.ctx.sys.log.dom.loginrecord.LoginStatus)
	 */
	@Override
	public void setLoginStatus(LoginStatus loginStatus) {
		this.entity.setLoginStatus(loginStatus.value);
	}
	
	@Override
	public void setLockStatus(Integer lockStatus) {
		this.entity.setLockStatus(lockStatus);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordSetMemento#setUrl(java.lang.String)
	 */
	@Override
	public void setUrl(Optional<String> url) {
		this.entity.setUrl(url.isPresent() ? url.get() : null);
	}
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.log.dom.loginrecord.LoginRecordSetMemento#setRemarks(java.lang.String)
	 */
	@Override
	public void setRemarks(Optional<String> remarks) {
		this.entity.setRemarks(remarks.isPresent() ? remarks.get() : null);
	}

}
