/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.password.changelog;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.shared.dom.user.password.HashPassword;

/**
 * The Class PasswordChangeLog.
 */

@Getter
public class PasswordChangeLog extends AggregateRoot{
	
	/** The log ID. */
	//ログID
	private String logID;
	
	/** The user ID. */
	//ユーザID
	private String userID;
	
	/** The modified date. */
	//変更日時
	private GeneralDateTime modifiedDate;
	
	/** The password. */
	//パスワード
	private HashPassword password;
	
	/**
	 * Save to memento.
	 *
	 * @param memento the memento
	 */
	public void saveToMemento(PasswordChangeLogSetMemento memento) {
		memento.setLogId(this.logID);
		memento.setUserId(this.userID);
		memento.setModifiedDate(this.modifiedDate);
		memento.setPassword(this.password);
	}

	/**
	 * Instantiates a new password change log.
	 *
	 * @param memento the memento
	 */
	public PasswordChangeLog(PasswordChangeLogGetMemento memento) {
		this.logID = memento.getLogId();
		this.userID = memento.getUserId();
		this.modifiedDate = memento.getModifiedDateTime();
		this.password = memento.getPassword();
	}

	/**
	 * Instantiates a new password change log.
	 *
	 * @param loginID the login ID
	 * @param userID the user ID
	 * @param modifiedDate the modified date
	 * @param password the password
	 */
	public PasswordChangeLog(String logID, String userID, GeneralDateTime modifiedDate, HashPassword password) {
		super();
		this.logID = logID;
		this.userID = userID;
		this.modifiedDate = modifiedDate;
		this.password = password;
	}

}
