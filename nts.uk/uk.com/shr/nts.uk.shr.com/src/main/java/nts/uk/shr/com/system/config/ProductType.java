package nts.uk.shr.com.system.config;

import lombok.AllArgsConstructor;
import nts.arc.enums.EnumAdaptor;

/**
 * 製品種別
 */
@AllArgsConstructor
public enum ProductType {

	/** 就業 */
	ATTENDANCE(1, "VersionAT"),
	
	/** 給与 */
	PAYROLL(2, "VersionPR"),
	
	/** 人事 */
	PERSONNEL(3, "VersionPN"),
	
	;
	public int value;
	public String systemConfigVersionKey;
	
	public static ProductType valueOf(int value) {
		return EnumAdaptor.valueOf(value, ProductType.class);
	}
}
