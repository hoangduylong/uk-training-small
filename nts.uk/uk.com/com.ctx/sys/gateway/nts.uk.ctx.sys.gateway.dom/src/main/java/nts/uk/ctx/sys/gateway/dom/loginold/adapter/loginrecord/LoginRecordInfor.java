package nts.uk.ctx.sys.gateway.dom.loginold.adapter.loginrecord;

import lombok.Data;

/* (non-Javadoc)
 * @see java.lang.Object#toString()
 */
@Data
public class LoginRecordInfor {

	/** The operation id. */
	public String operationId;

	/** The login method. */
	public Integer loginMethod;

	/** The login status. */
	public Integer loginStatus;

	/** The lock status. */
	public boolean lockStatus;

	/** The url. */
	public String url;

	/** The remarks. */
	public String remarks;

	/**
	 * Instantiates a new login record dto.
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
	public LoginRecordInfor(String operationId, Integer loginMethod, Integer loginStatus, boolean lockStatus, String url,
			String remarks) {
		this.operationId = operationId;
		this.loginMethod = loginMethod;
		this.loginStatus = loginStatus;
		this.lockStatus = lockStatus;
		this.url = url;
		this.remarks = remarks;
	}
}
