package nts.uk.ctx.sys.auth.dom.password.changelog;

import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.shared.dom.user.password.HashPassword;

/**
 * The Interface PasswordChangeLogSetMemento.
 */
public interface PasswordChangeLogSetMemento {
	
	/**
	 * Sets the login id.
	 *
	 * @param loginID the new login id
	 */
	public void setLogId(String logID);
	
	/**
	 * Sets the user id.
	 *
	 * @param userID the new user id
	 */
	public void setUserId(String userID);
	
	/**
	 * Sets the modified date.
	 *
	 * @param modifiedDate the new modified date
	 */
	public void setModifiedDate(GeneralDateTime modifiedDate);
	
	/**
	 * Sets the password.
	 *
	 * @param password the new password
	 */
	public void setPassword(HashPassword password);

}
