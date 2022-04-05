package nts.uk.ctx.sys.auth.app.find.grant.roleindividual.dto;

import lombok.Value;
import nts.uk.ctx.sys.shared.dom.user.User;


@Value
public class UserDto {
	/** The user id. */
	private String userID;
	/*ユーザ名*/
	private String userName;
	
	public static UserDto fromDomain (User domain){
		return new UserDto(
				domain.getUserID(),
				domain.getUserName().toString());
	}

}
