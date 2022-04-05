package nts.uk.shr.com.operation;

import java.util.Optional;

public interface SystemOperationSettingAdapter {
	/**
	 * CCG020_メニュー.システム利用停止の警告確認
	 * @return
	 */
	public SystemOperationSetting getSetting();
	
	/**
	 * システム停止中の確認
	 * @return
	 * if stopping - return Optional with value
	 * else return empty optional
	 */
	public Optional<String> stopUseConfirm();
	/**
	 * システム利用停止の確認_ログイン前
	 */
	public SystemSuspendOut stopUseConfirm_loginBf(String contractCD, String companyCD, int loginMethod, String programID, String screenID);
	
}
