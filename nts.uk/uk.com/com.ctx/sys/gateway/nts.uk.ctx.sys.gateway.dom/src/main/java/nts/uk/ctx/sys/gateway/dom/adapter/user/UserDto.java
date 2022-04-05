/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.adapter.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class UserDto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

	/** The user id. */
	private String userId;

	/** The login id. */
	private String loginId;

	/** The user name. */
	private String userName;

	/** The associated person ID. */
	private String associatedPersonID;

	/** The mail address. */
	private String mailAddress;

}