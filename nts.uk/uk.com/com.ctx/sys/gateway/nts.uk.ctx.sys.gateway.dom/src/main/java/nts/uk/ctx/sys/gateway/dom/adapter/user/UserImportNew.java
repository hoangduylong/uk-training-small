/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.adapter.user;

import java.util.Optional;

import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

/**
 * The Class UserImport.
 */
@Getter
@NoArgsConstructor
public class UserImportNew {

	/** The user id. */
	private String userId;

	/** The login id. */
	private String loginId;

	/** The mail address. */
	private Optional<String> mailAddress;

	/** The user name. */
	private Optional<String> userName;

	/** The person id. */
	private Optional<String> associatePersonId;

	/** The contract code. */
	private String contractCode;

	/** The expiration date. */
	private GeneralDate expirationDate;

	public UserImportNew(
			String userId, 
			Optional<String> userName, 
			Optional<String> mailAddress, 
			String loginId, 
			Optional<String> associatePersonId, 
			String contractCode, 
			GeneralDate expirationDate) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.mailAddress = mailAddress;
		this.loginId = loginId;
		this.associatePersonId = associatePersonId ;
		this.contractCode = contractCode;
		this.expirationDate = expirationDate;
	}
}
