package nts.uk.ctx.sys.auth.pubimp.role.authorize;

import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import lombok.val;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrant;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrantRepository;
import nts.uk.ctx.sys.auth.dom.role.authorize.AuthorizeUserRoles;
import nts.uk.ctx.sys.auth.dom.roleset.RoleSet;
import nts.uk.ctx.sys.auth.dom.roleset.service.RoleSetService;
import nts.uk.ctx.sys.auth.pub.role.authorize.AuthorizePub;
import nts.uk.shr.com.context.loginuser.LoginUserContextManager.RoleIdSetter;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

@Stateless
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class AuthorizePubImp implements AuthorizePub {

	@Inject
	private RoleIndividualGrantRepository roleIndRepo;
	
	@Inject
    private RoleSetService roleSetService;
	
	@Override
	public void authorize(RoleIdSetter roleIdSetter, String userId) {

		val require = new RequireImpl();
		
		AuthorizeUserRoles.authorize(require, roleIdSetter, userId);
	}

	@Override
	public LoginUserRoles buildUserRoles(String userId) {

		val require = new RequireImpl();
		
		return AuthorizeUserRoles.buildUserRoles(require, userId);
	}

	public class RequireImpl implements AuthorizeUserRoles.Require {

		@Override
		public List<RoleIndividualGrant> getRoleIndividualGrants(String userId, GeneralDate date) {
			return roleIndRepo.findListByUserAndDate(userId, date);
		}

		@Override
		public Optional<RoleSet> getRoleSet(String userId, GeneralDate date) {
			return roleSetService.getRoleSetFromUserId(userId, date);
		}
		
	}
}
