package nts.uk.ctx.sys.auth.pubimp.spr;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.pub.grant.RoleFromUserIdPub;
import nts.uk.ctx.sys.auth.pub.spr.UserSprExport;
import nts.uk.ctx.sys.auth.pub.spr.UserSprPub;
import nts.uk.ctx.sys.shared.dom.user.UserRepository;
/**
 * 
 * @author Doan Duy Hung
 *
 */
@Stateless
public class UserSprPubImpl implements UserSprPub {
	
	@Inject
	private UserRepository userRepository;
	
	@Inject
	private RoleFromUserIdPub roleFromUserIdPub;
	
	@Override
	public Optional<UserSprExport> getUserSpr(String personID) {
		return userRepository.getByAssociatedPersonId(personID)
		.map(x -> new UserSprExport(
				x.getUserID(), 
				x.getLoginID().v(), 
				x.getUserName().isPresent() ? x.getUserName().get().v() : "", 
				x.getAssociatedPersonID().isPresent() ? x.getAssociatedPersonID().get() : "", 
				x.getMailAddress().isPresent() ? x.getMailAddress().get().v() : ""));
	}
	
	@Override
	public Optional<String> getRoleFromUserId(String companyID, String userId, int roleType) {
		return Optional.ofNullable(roleFromUserIdPub.getRoleFromUserId(userId, roleType, GeneralDate.today()));
	}
}
