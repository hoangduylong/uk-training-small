package nts.uk.ctx.sys.shared.dom.user;

import java.util.Optional;

/**
 * ユーザを取得する
 * （ユーザに紐づく情報からユーザを取得する）
 */
public class FindUser {
	
//	public static Optional<User> byEmployeeId(RequireByEmployeeId require, String employeeId) {
//		return require.getPersonalIdByEmployeeId(employeeId)
//				.flatMap(pid -> require.getUser(pid));
//	}
//	
//	public static Optional<User> byEmployeeCode(RequireByEmployeeCode require, String companyId, String employeeCode){
//		return require.getPersonalIdByEmployeeCode(companyId, employeeCode)
//				.flatMap(pid -> require.getUser(pid));
//	}
//
//	public static interface RequireByEmployeeId extends RequireUser {
//		Optional<String> getPersonalIdByEmployeeId(String employeeId);
//	}
//	
//	public static interface RequireByEmployeeCode extends RequireUser {
//		Optional<String> getPersonalIdByEmployeeCode(String companyId, String employeeCode);
//	}
//	
//	public static interface RequireUser {
//		Optional<User> getUser(String personalId);
//	}
}
