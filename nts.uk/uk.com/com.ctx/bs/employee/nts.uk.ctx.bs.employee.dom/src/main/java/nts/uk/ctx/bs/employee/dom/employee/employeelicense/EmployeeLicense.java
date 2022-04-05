package nts.uk.ctx.bs.employee.dom.employee.employeelicense;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.layer.dom.AggregateRoot;


@Getter
@AllArgsConstructor
@NoArgsConstructor
/*
 * Domain 社員ライセンス
 */
public class EmployeeLicense extends AggregateRoot {
	/**
	 * 契約コード Contract Code
	 **/
	private ContractCode contractCD;

	/**
	 * 上限人数 Max number of License
	 **/
	private MaxNumberLicenses maxNumberLicenses;

	/**
	 * 警告人数 Warning number of License
	 **/
	private WarningNumberLicenses warningNumberLicenses;
	
	/**
	 * ライセンスキー
	 */
	private LicenseKey licenseKey;

	public static EmployeeLicense createFromJavatype(String contractCD, int maxNumberLicenses, int warningNumberLicenses , String licenseKey) {
		return new EmployeeLicense (
				new ContractCode(contractCD),
				new MaxNumberLicenses(maxNumberLicenses),
				new WarningNumberLicenses(warningNumberLicenses),
				new LicenseKey(licenseKey)
				);
	}










	
}
