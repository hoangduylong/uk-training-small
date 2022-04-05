package nts.uk.ctx.sys.shared.infra.repository.user;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.shr.com.user.UserInfoAdapter;
@Stateless
public class UserInfoImpl extends JpaRepository implements UserInfoAdapter  {

	private static final String SELECT_BY_ID = "SELECT c.userName FROM SacmtUser c WHERE c.sacmtUserPK.userID= :userId";
	@Override
	public String getUserName(String userId) {
		return this.queryProxy().query(SELECT_BY_ID, String.class)
				.setParameter("userId", userId)
				.getSingle().orElse("");
		//return null;
	}

}
