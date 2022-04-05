package nts.uk.ctx.sys.gateway.ac.find.login.authorize;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.pub.role.authorize.AuthorizePub;
import nts.uk.ctx.sys.gateway.app.command.login.session.LoginAuthorizeAdapter;
import nts.uk.shr.com.context.loginuser.LoginUserContextManager.RoleIdSetter;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

@Stateless
public class LoginAuthorizeAdapterImpl implements LoginAuthorizeAdapter {

	@Inject
	private AuthorizePub pub;
	
	@Override
	public void authorize(RoleIdSetter roleIdSetter, String userId) {
		pub.authorize(roleIdSetter, userId);
	}

	@Override
	public LoginUserRoles buildUserRoles(String userId) {
		return pub.buildUserRoles(userId);
	}

}
