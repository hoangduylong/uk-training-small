package nts.uk.ctx.sys.auth.pub.user;

import lombok.Getter;

@Getter
public class UserInforEx {
	String userID;
	String loginID;
	String empID;
	String empCD;
	public UserInforEx(String userID, String loginID, String empID, String empCD) {
		super();
		this.userID = userID;
		this.loginID = loginID;
		this.empID = empID;
		this.empCD = empCD;
	}
}
