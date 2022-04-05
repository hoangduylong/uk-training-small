package nts.uk.shr.com.system.config;

import lombok.AllArgsConstructor;
import nts.arc.enums.EnumAdaptor;

/**
 * インストール形式
 */
@AllArgsConstructor
public enum InstallationType {

	/** クラウド */
	CLOUD(0),
	
	/** オンプレ */
	ON_PREMISES(1);
	
	public int value;
	
	public static InstallationType valueOf(int value) {
		return EnumAdaptor.valueOf(value, InstallationType.class);
	}
}
