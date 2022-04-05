package nts.uk.ctx.sys.auth.pub.spr;

import java.util.Optional;
/**
 * 
 * @author Doan Duy Hung
 *
 */
public interface UserSprPub {
	
	/**
	 * 紐付け先個人IDからユーザを取得する
	 * @param personID 個人ID
	 * @return ユーザを取得する
	 */
	public Optional<UserSprExport> getUserSpr(String personID);
	
	/**
	 * ユーザIDからロールを取得する
	 * @param userId ユーザーID
	 * @param roleType ロール種類
	 * @return ロールID
	 */
	public Optional<String> getRoleFromUserId(String companyID, String userId, int roleType);
	
}
