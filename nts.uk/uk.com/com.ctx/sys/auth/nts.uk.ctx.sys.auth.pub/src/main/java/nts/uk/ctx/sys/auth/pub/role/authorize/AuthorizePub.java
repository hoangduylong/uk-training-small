package nts.uk.ctx.sys.auth.pub.role.authorize;

import nts.uk.shr.com.context.loginuser.LoginUserContextManager.RoleIdSetter;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

/**
 * ユーザに対して認可処理（ロールIDの付与）を実行する
 */
public interface AuthorizePub {

	void authorize(RoleIdSetter roleIdSetter, String userId);
	
	LoginUserRoles buildUserRoles(String userId);
}
