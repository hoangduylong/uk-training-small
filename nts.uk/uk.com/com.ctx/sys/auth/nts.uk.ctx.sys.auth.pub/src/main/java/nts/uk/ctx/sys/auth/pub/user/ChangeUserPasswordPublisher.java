/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pub.user;

/**
 * The Interface ChangeUserPassword.
 */
public interface ChangeUserPasswordPublisher {

	/**
	 * Check before making change pass.
	 *
	 * @param userId the user id
	 * @param newPassword the new password
	 */
	//ユーザのパスワードを変更する RequestList 384
	void changePass(String userId,String newPassword);
}
