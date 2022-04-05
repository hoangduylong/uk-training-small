/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.adapter.user;

import java.util.Optional;

import lombok.Builder;
import lombok.Getter;
import nts.arc.time.GeneralDate;

/**
 * The Class UserImport.
 */
@Getter
@Builder
public class UserImport {
	
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
	
}
