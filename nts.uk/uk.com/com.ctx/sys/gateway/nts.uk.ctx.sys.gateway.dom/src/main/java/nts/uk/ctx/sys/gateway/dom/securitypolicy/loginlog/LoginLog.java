package nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;

/**
 * Gets the operation.
 *
 * @return the operation
 */
@Getter
//ログインログ
public class LoginLog extends AggregateRoot{
	
	/** The user id. */
	//ユーザID
	private String userId;
	
	/** The contract code. */
	//契約コード
	private ContractCode contractCode;
	
	/** The program id. */
	//プログラムID
	private String programId;
	
	/** The process date time. */
	//処理日時
	private GeneralDateTime processDateTime;
	
	/** The success or fail. */
	//成功失敗区分
	private SuccessFailureClassification successOrFail;
	
	/** The operation. */
	//操作区分
	private OperationSection operation;
	
	/**
	 * Instantiates a new login log.
	 *
	 * @param memento the memento
	 */
	public LoginLog(LoginLogGetMemento memento) {
		this.userId = memento.getUserId();
		this.contractCode = memento.getContractCode();
		this.programId = memento.getProgramId();
		this.processDateTime = memento.getProcessDateTime();
		this.successOrFail = memento.getSuccessOrFail();
		this.operation = memento.getOperation();
	}
	
	/**
	 * Save to memento.
	 *
	 * @param memento the memento
	 */
	public void saveToMemento(LoginLogSetMemento memento) {
		memento.setUserId(this.userId);
		memento.setContractCode(this.contractCode);
		memento.setProcessDateTime(this.processDateTime);
		memento.setProgramId(this.programId);
		memento.setSuccessOrFail(this.successOrFail);
		memento.setOperation(this.operation);
	}

}
