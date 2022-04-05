package nts.uk.ctx.sys.portal.ac.find.user;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.pub.user.UserPublisher;
import nts.uk.ctx.sys.auth.pub.user.getuser.GetUserDto;
import nts.uk.ctx.sys.auth.pub.user.getuser.GetUserPublish;
import nts.uk.ctx.sys.portal.dom.adapter.user.UserAdapter;
import nts.uk.ctx.sys.portal.dom.adapter.user.UserDto;

@Stateless
public class UserPortalAdapterImpl implements UserAdapter {
	
	@Inject
	private UserPublisher userPublisher;
	
	@Inject
	private GetUserPublish userPub;
	
	@Override
	public Optional<UserDto> getUserInfo(String userId) {
		return userPublisher.getUserInfo(userId).map(
				u -> new UserDto(u.getUserID(), u.getUserName(), u.getAssociatedPersonID()));
	}
	
	@Override
	public Optional<String> getUserName(String userId) {
		List<GetUserDto> lstUser = userPub.getUser(Arrays.asList(userId));
		if(lstUser.isEmpty()){
			return Optional.empty();
		}
		return lstUser.get(0).getUserName();
	}
}
