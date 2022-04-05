package nts.uk.ctx.sys.gateway.dom.login.password.userpassword;

import lombok.RequiredArgsConstructor;
import nts.arc.enums.EnumAdaptor;

/**
 * パスワードの状態
 */
@RequiredArgsConstructor
public enum PasswordState {
	
	/** 正式 */
	OFFICIAL(0),
	
	/** 初期パスワード */
	INITIAL(1),
	
	/** リセット */
	RESET(2);
	
	public final int value;
	
	public static PasswordState valueOf(int value) {
		return EnumAdaptor.valueOf(value, PasswordState.class);
	}
}
