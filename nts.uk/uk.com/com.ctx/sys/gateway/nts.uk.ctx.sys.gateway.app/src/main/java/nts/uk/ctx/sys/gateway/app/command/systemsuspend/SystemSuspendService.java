package nts.uk.ctx.sys.gateway.app.command.systemsuspend;

import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

public interface SystemSuspendService {
	
	/**
	 * システム利用停止の確認
	 * @param contractCD
	 * @param companyCD
	 * @param loginMethod
	 * @param programID
	 * @param screenID
	 * @return
	 */
	public SystemSuspendOutput confirmSystemSuspend(String contractCD, String companyCD, int loginMethod, String programID, String screenID);
	
	public SystemSuspendOutput confirmSystemSuspend(String contractCD, String companyCD, int loginMethod, String programID, String screenID, LoginUserRoles loginUserRoles);
	
	/**
	 * システム利用停止の確認_ログイン前
	 * @param contractCD
	 * @param companyCD
	 * @param loginMethod
	 * @param programID
	 * @param screenID
	 * @return
	 */
	public SystemSuspendOutput confirmSystemSuspend_BefLog(String contractCD, String companyCD, int loginMethod, String programID, String screenID);
	
	/**
	 * Check usage stop.
	 *
	 * @param contractCD the contract CD
	 * @param companyCD the company CD
	 * @return the usage stop output
	 */
	public UsageStopOutput checkUsageStop(String contractCD, String companyCD);
}
