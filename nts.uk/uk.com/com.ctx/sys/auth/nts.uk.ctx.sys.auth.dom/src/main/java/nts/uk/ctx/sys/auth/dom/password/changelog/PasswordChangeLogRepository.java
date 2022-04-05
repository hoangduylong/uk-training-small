/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.password.changelog;

import java.util.List;

/**
 * The Interface PasswordChangeLogRepository.
 */
public interface PasswordChangeLogRepository {
	
	/**
	 * get list パスワード変更ログ
	 * @param ユーザID userId
	 * @return
	 * @author hoatt
	 */
	List<PasswordChangeLog> getListPwChangeLog(String userId);
}
