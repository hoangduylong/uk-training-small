package nts.uk.ctx.sys.gateway.infra.repository.securitypolicy.loginlog;

import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogGetMemento;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.OperationSection;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.SuccessFailureClassification;
import nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.loginlog.SgwdtLoginLog;

/**
 * The Class JpaLoginLogGetMemento.
 */
public class JpaLoginLogGetMemento implements LoginLogGetMemento{
	
	/** The entity. */
	private SgwdtLoginLog entity;
	
	/**
	 * Instantiates a new jpa login log get memento.
	 *
	 * @param sgwmtLoginLog the sgwmt login log
	 */
	public JpaLoginLogGetMemento(SgwdtLoginLog sgwmtLoginLog) {
		this.entity = sgwmtLoginLog;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogGetMemento#getUserId()
	 */
	@Override
	public String getUserId() {
		return this.entity.getUserId();
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogGetMemento#getContractCode()
	 */
	@Override
	public ContractCode getContractCode() {
		return new ContractCode(this.entity.getContractCd());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogGetMemento#getProgramId()
	 */
	@Override
	public String getProgramId() {
		return this.entity.getProgramId();
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogGetMemento#getProcessDateTime()
	 */
	@Override
	public GeneralDateTime getProcessDateTime() {
		return this.getProcessDateTime();
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogGetMemento#getSuccessOrFail()
	 */
	@Override
	public SuccessFailureClassification getSuccessOrFail() {
		return SuccessFailureClassification.valueOf(this.entity.getSuccessOrFailure());
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogGetMemento#getOperation()
	 */
	@Override
	public OperationSection getOperation() {
		return OperationSection.valueOf(this.entity.getOperationSection());
	}
	
}
