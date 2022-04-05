package nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked;


import lombok.Value;
import nts.uk.ctx.sys.gateway.dom.adapter.user.UserImportNew;

/*
 * @author: Nguyen Van Hanh
 */
@Value
public class SearchUser {
	String userID;
	String loginID;
	String userName;

	public SearchUser(String userID, String loginID, String userName) {
		this.userID = userID;
		this.loginID = loginID;
		this.userName = userName;
	}

	public static SearchUser convertToDto(UserImportNew user) {
		
		return new SearchUser(user.getUserId(), user.getLoginId(),user.getUserName().orElse(""));
		
	}
}
