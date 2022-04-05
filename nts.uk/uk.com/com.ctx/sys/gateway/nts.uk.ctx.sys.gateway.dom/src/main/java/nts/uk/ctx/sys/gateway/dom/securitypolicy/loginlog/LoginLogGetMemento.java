package nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog;

import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;

/**
 * The Interface LoginLogGetMemento.
 */
public interface LoginLogGetMemento {
	
	/**
	 * Gets the user id.
	 *
	 * @return the user id
	 */
	public String getUserId();
	
	/**
	 * Gets the contract code.
	 *
	 * @return the contract code
	 */
	public ContractCode getContractCode();
	
	/**
	 * Gets the program id.
	 *
	 * @return the program id
	 */
	public String getProgramId();
	
	/**
	 * Gets the process date time.
	 *
	 * @return the process date time
	 */
	public GeneralDateTime getProcessDateTime();
	
	/**
	 * Gets the success or fail.
	 *
	 * @return the success or fail
	 */
	public SuccessFailureClassification getSuccessOrFail();
	
	/**
	 * Gets the operation.
	 *
	 * @return the operation
	 */
	public OperationSection getOperation(); 

}
