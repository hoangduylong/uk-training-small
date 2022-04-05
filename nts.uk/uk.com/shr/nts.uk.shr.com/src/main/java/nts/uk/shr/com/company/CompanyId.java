package nts.uk.shr.com.company;

public class CompanyId {
	
	public static String create(String tenantCode, String companyCode) {
		return tenantCode + "-" + companyCode;
	}
	
	public static String getTenantCode(String companyId) {
		if(!companyId.contains("-")) {
			throw new RuntimeException("会社IDが不正です");
		}
		return companyId.split("-")[0];
	}

	public static String getCompanyCode(String companyId) {
		if(!companyId.contains("-")) {
			throw new RuntimeException("会社IDが不正です");
		}
		return companyId.split("-")[1];
	}

	public static String zeroCompanyInTenant(String tenantCode) {
		return create(tenantCode, "0000");
	}
	
	public static String getContractCodeOf(String companyId) {
		return companyId.split("-")[0];
	}
}
