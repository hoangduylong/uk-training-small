/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.log.dom.loginrecord;

import java.util.Optional;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * The Class LoginRecord.
 */
// ログイン記録
@Getter
public class LoginRecord extends AggregateRoot {

	/** The operation id. */
	// 操作ID
	private String operationId;

	/** The login method. */
	// 方法
	private LoginMethod loginMethod;

	/** The login status. */
	// 状態
	private LoginStatus loginStatus;

	/** The lock status. */
	// ロック状態
	private boolean lockStatus;

	/** The url. */
	// url
	private Optional<String> url;

	/** The remarks. */
	// 備考
	private Optional<String> remarks;

	/**
	 * Save to memento.
	 *
	 * @param memento
	 *            the memento
	 */
	public void saveToMemento(LoginRecordSetMemento memento) {
		memento.setOperationId(this.operationId);
		memento.setLoginMethod(this.loginMethod);
		memento.setLoginStatus(this.loginStatus);
		memento.setLockStatus(this.lockStatus ? 1 : 0);
		memento.setUrl(this.url);
		memento.setRemarks(this.remarks);
	}

	/**
	 * Instantiates a new login record.
	 *
	 * @param memento
	 *            the memento
	 */
	public LoginRecord(LoginRecordGetMemento memento) {
		this.operationId = memento.getOperationId();
		this.loginMethod = memento.getLoginMethod();
		this.loginStatus = memento.getLoginStatus();
		this.lockStatus = memento.getLockStatus();
		this.url = memento.getUrl();
		this.remarks = memento.getRemarks();
	}

	/**
	 * Instantiates a new login record.
	 *
	 * @param operationId
	 *            the operation id
	 * @param loginMethod
	 *            the login method
	 * @param loginStatus
	 *            the login status
	 * @param lockStatus
	 *            the lock status
	 * @param url
	 *            the url
	 * @param remarks
	 *            the remarks
	 */
	public LoginRecord(String operationId, LoginMethod loginMethod, LoginStatus loginStatus, boolean lockStatus,
			String url, String remarks) {
		super();
		this.operationId = operationId;
		this.loginMethod = loginMethod;
		this.loginStatus = loginStatus;
		this.lockStatus = lockStatus;
		this.url = Optional.ofNullable(url == null ? null : url);
		this.remarks = Optional.ofNullable(remarks == null ? null : remarks);
	}

	public static LoginRecord createFromJavaType(String operationId, Integer loginMethod, Integer loginStatus,
			boolean lockStatus, String url, String remarks) {
		return new LoginRecord(operationId, LoginMethod.valueOf(loginMethod), LoginStatus.valueOf(loginStatus),
				lockStatus, url, remarks);

	}
}
