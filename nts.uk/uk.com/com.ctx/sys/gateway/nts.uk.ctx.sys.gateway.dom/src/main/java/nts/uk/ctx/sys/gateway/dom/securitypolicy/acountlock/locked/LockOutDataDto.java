/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked;

import lombok.Builder;
import lombok.Value;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.shared.dom.user.ContractCode;

/**
 * The Class LogoutDataDto.
 */
@Builder
@Value
public class LockOutDataDto implements LockOutDataGetMemento {

	/** The user id. */
	private String userId;

	/** The logout date time. */
	private GeneralDateTime logoutDateTime;

	/** The log type. */
	private Integer lockType;

	/** The contract code. */
	private String contractCode;

	/** The login method. */
	private Integer loginMethod;

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.logoutdata.LogoutDataGetMemento#getUserId()
	 */
	@Override
	public String getUserId() {
		return this.userId;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.logoutdata.LogoutDataGetMemento#getLogoutDateTime()
	 */
	@Override
	public GeneralDateTime getLockOutDateTime() {
		return this.logoutDateTime;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.logoutdata.LogoutDataGetMemento#getLogType()
	 */
	@Override
	public LockType getLogType() {
		return LockType.valueOf(this.lockType);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.logoutdata.LogoutDataGetMemento#getContractCode()
	 */
	@Override
	public ContractCode getContractCode() {
		return new ContractCode(this.contractCode);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.logoutdata.LogoutDataGetMemento#getLoginMethod()
	 */
	@Override
	public LoginMethod getLoginMethod() {
		return LoginMethod.valueOf(this.loginMethod);
	}
}
