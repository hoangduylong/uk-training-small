package nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog;


import nts.arc.time.GeneralDateTime;

/**
 * The Interface LoginLogRepository.
 */
public interface LoginLogRepository {
	
	/**
	 * Gets the login log by conditions.
	 *
	 * @param userId the user id
	 * @param startTime the start time
	 * @return the login log by conditions
	 */
	Integer getLoginLogByConditions(String userId, GeneralDateTime startTime);
	
	/**
	 * Adds the.
	 *
	 * @param loginLog the login log Dto
	 */
	void add(LoginLog loginLog);
	/**
	 * delete Login Log
	 * @param ユーザID userId
	 * @param 成功失敗区分 successOrFail
	 * @param 操作区分 operation
	 */
	void deleteLoginLog(String userId,int successOrFail, int operation);
}
