package nts.uk.ctx.sys.gateway.app.command.login.session;

import nts.uk.shr.com.context.loginuser.LoginUserContextManager.RoleIdSetter;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

public interface LoginAuthorizeAdapter {

	void authorize(RoleIdSetter roleIdSetter, String userId);
	
	LoginUserRoles buildUserRoles(String userId);
}
