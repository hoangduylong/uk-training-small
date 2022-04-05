package nts.uk.shr.com.security.audittrail.correction.content;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * ユーザ情報
 */
@RequiredArgsConstructor
public class UserInfo {

	/** ユーザID */
	@Getter
	private final String userId;
	
	/** 社員ID */
	@Getter
	private final String employeeId;
	
	/** ユーザ名 */
	@Getter
	private final String userName;
	
	public static UserInfo employee(String userId, String employeeId, String employeeName) {
		return new UserInfo(userId, employeeId, employeeName);
	}
	
	public static UserInfo user(String userId, String userName) {
		return new UserInfo(userId, "", userName);
	}
}