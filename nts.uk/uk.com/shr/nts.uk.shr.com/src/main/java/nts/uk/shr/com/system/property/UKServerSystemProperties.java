package nts.uk.shr.com.system.property;

import nts.arc.system.ServerSystemProperties;

public class UKServerSystemProperties {

	public static String get(String key) {
		return ServerSystemProperties.get(key);
	}
	
	/**
	 * クラウド環境で動作させるか
	 * @return
	 */
	public static boolean isCloud() {
    	return "cloud".equalsIgnoreCase(get("nts.uk.installtype"));
	}
	
	/**
	 * TenantLocatorを使用するか
	 * @return
	 */
	public static boolean usesTenantLocator() {
		return "tenantlocator".equalsIgnoreCase(get("nts.uk.datasource.mode"));
	}
	
	/**
	 * データソース名（TenantLocatorを使用しない場合の設定値）
	 * @return
	 */
	public static String dataSourceName() {
		return get("nts.uk.datasource.name");
	}
	
	/**
	 * JobDistributorを使用するか
	 * @return
	 */
	public static boolean usesJobDistributor() {
		return "distributor".equalsIgnoreCase(get("nts.uk.jobscheduler"));
	}
}
