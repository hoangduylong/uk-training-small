package nts.uk.ctx.sys.auth.pub.user.getuser;

import java.util.List;
import java.util.Optional;

public interface GetUserPublish {
	
	/**
	 * Algorithm: ユーザを取得する
	 * RequestList169
	 * @param userIds
	 * @return
	 */
	List<GetUserDto> getUser(List<String> userIds);
	
	/**
	 * Algorithm: 紐付け先個人IDからユーザを取得する
	 * RequestList220
	 * @param personId
	 * @return
	 */
	Optional<GetUserDto> getUserWithPersonId(String personId);

}
