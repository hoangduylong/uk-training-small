package nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog;

import lombok.Builder;
import lombok.Value;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;

@Builder
@Value
public class LoginLogDto implements LoginLogGetMemento{

	/** The user id. */
	private String userId;
	
	/** The contract code. */
	private String contractCode;
	
	/** The program id. */
	private String programId;
	
	/** The process date time. */
	private GeneralDateTime processDateTime;
	
	/** The success or fail. */
	private Integer successOrFail;
	
	/** The operation. */
	private Integer operation;
	

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogGetMemento#getUserId()
	 */
	@Override
	public String getUserId() {
		return this.userId;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogGetMemento#getProcessDateTime()
	 */
	@Override
	public GeneralDateTime getProcessDateTime() {
		return this.processDateTime;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogGetMemento#getProgramId()
	 */
	@Override
	public String getProgramId() {
		return this.programId;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogGetMemento#getContractCode()
	 */
	@Override
	public ContractCode getContractCode() {
		return new ContractCode(this.contractCode);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogGetMemento#getSuccessOrFail()
	 */
	@Override
	public SuccessFailureClassification getSuccessOrFail() {
		return SuccessFailureClassification.valueOf(this.successOrFail);
	}
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogGetMemento#getOperation()
	 */
	@Override
	public OperationSection getOperation() {
		return OperationSection.valueOf(this.operation);
	}
}
