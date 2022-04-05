package nts.uk.ctx.sys.gateway.ac.find.login;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.pub.grant.RoleFromUserIdPub;
import nts.uk.ctx.sys.gateway.dom.role.RoleFromUserIdAdapter;

/**
 * The Class RoleFromUserIdAdapterImpl.
 */
@Stateless
public class RoleFromUserIdAdapterImpl implements RoleFromUserIdAdapter {

	/** The role from user id pub. */
	@Inject
	private RoleFromUserIdPub roleFromUserIdPub;


	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.gateway.dom.login.adapter.RoleFromUserIdAdapter#getRoleFromUser(java.lang.String, java.lang.Integer, nts.arc.time.GeneralDate)
	 */
	@Override
	public String getRoleFromUser(String userId, Integer roleType, GeneralDate baseDate) {
        return roleFromUserIdPub.getRoleFromUserId(userId, roleType, baseDate);
	}
	
	@Override
	public String getRoleFromUser(String userId, Integer roleType, GeneralDate baseDate, String comId) {
        return roleFromUserIdPub.getRoleFromUserId(userId, roleType, baseDate, comId);
	}
	
	


    @Override
    public Optional<RoleInfoImport> getRoleInfoFromUser(String userId, int roleType, GeneralDate baseDate, String comId) {
        return roleFromUserIdPub.getRoleInfoFromUserId(userId, roleType, baseDate, comId)
        		.map(roleInfo -> new RoleInfoImport(roleInfo.isInCharge(), roleInfo.getRoleId()));
    }

}
