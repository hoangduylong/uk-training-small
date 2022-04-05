package nts.uk.ctx.sys.gateway.app.command.loginold.dto;

import lombok.NoArgsConstructor;

/**
 * The Class LoginInforDto.
 */
@NoArgsConstructor
public class LoginInforDto {
	
	/** The login id. */
	public String loginId;
	
	/** The user name. */
	public String userName;
	
	public String userId;
	
	public String contractCode;
	
	/**
	 * Instantiates a new login infor dto.
	 *
	 * @param loginId the login id
	 * @param userName the user name
	 */
	public LoginInforDto(String loginId, String userName, String userId, String contractCode) {
		this.loginId = loginId;
		this.userName = userName;
		this.userId = userId;
		this.contractCode = contractCode;
	}
}
