/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pub.user;

import java.util.Optional;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.gul.text.StringUtil;

/**
 * Gets the associated person ID.
 *
 * @return the associated person ID
 */
@Getter
public class UserExport {
	
	/** The user ID. */
	private String userID;
	
	/** The login ID. */
	private String loginID;
	
	/** The mail address. */
	private Optional<String> mailAddress;
	
	/** The contract code. */
	private String contractCode;
	
	/** The user name. */
	private Optional<String> userName;
	
	/** The expiration date. */
	private GeneralDate expirationDate;
	
	/** The associated person ID. */
	private Optional<String> associatedPersonID;
	
	/**
	 * Instantiates a new user export.
	 *
	 * @param userID the user ID
	 * @param loginID the login ID
	 * @param contractCode the contract code
	 * @param userName the user name
	 * @param password the password
	 * @param mailAddress the mail address
	 * @param associatedPersonID the associated person ID
	 * @param expirationDate the expiration date
	 */
	public UserExport(String userID, String loginID, String contractCode, String userName, String mailAddress, String associatedPersonID,
			GeneralDate expirationDate) {
		this.userID = userID;
		this.loginID = loginID;
		this.contractCode = contractCode;
		this.userName = Optional.ofNullable(userName == null ? null : userName);
		this.mailAddress =Optional.ofNullable(mailAddress == null ? null : mailAddress);
		this.associatedPersonID = Optional.ofNullable(associatedPersonID == null ? null : associatedPersonID);
		this.expirationDate = expirationDate;
	}
	
	public boolean isExistAssociatedPersonID(String associatedPersonID){
		return !StringUtil.isNullOrEmpty(this.associatedPersonID.get(), false);
	}
}