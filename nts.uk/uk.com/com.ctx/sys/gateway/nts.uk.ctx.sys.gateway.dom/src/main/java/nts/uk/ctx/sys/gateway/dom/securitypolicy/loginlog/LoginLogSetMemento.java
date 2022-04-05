package nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog;

import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;

/**
 * The Interface LoginLogSetMemento.
 */
public interface LoginLogSetMemento {

	/**
	 * Sets the user id.
	 *
	 * @param userId the new user id
	 */
	public void setUserId(String userId);
	
	/**
	 * Sets the contract code.
	 *
	 * @param contractCode the new contract code
	 */
	public void setContractCode(ContractCode contractCode);
	
	/**
	 * Sets the program id.
	 *
	 * @param programId the new program id
	 */
	public void setProgramId(String programId);
	
	/**
	 * Sets the process date time.
	 *
	 * @param processDateTime the new process date time
	 */
	public void setProcessDateTime(GeneralDateTime processDateTime);
	
	
	/**
	 * Sets the success or fail.
	 *
	 * @param successOrFail the new success or fail
	 */
	public void setSuccessOrFail(SuccessFailureClassification successOrFail);
	
	/**
	 * Sets the operation.
	 *
	 * @param operation the new operation
	 */
	public void setOperation(OperationSection operation);
}
