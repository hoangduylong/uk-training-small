package nts.uk.ctx.sys.portal.dom.adapter.user;

import java.util.Optional;

public interface UserAdapter {

	Optional<UserDto> getUserInfo(String userId);
	
	Optional<String> getUserName(String userId);
}
