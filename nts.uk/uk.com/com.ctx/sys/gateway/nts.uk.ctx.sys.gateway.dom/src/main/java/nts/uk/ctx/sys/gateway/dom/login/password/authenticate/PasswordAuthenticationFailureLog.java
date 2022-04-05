package nts.uk.ctx.sys.gateway.dom.login.password.authenticate;

import lombok.Getter;
import nts.arc.layer.dom.objecttype.DomainAggregate;
import nts.arc.time.GeneralDateTime;
import nts.gul.text.StringUtil;

/**
 * パスワード認証失敗記録
 */
@Getter
public class PasswordAuthenticationFailureLog implements DomainAggregate {

	/** 失敗日時 */
	private final GeneralDateTime failureDateTime;
	/** 試行したユーザID */
	private final String triedUserId;
	/** 試行したパスワード*/
	private final String triedPassword;
	
	public PasswordAuthenticationFailureLog(GeneralDateTime dateTime, String userId, String password) {
		this.failureDateTime = dateTime;
		this.triedUserId = userId;
		// ユーザー入力の値は適当な長さでカットして保持する
		this.triedPassword = StringUtil.cutOffAsLengthHalf(password, 100);
	}
	
	/**
	 * いま失敗した
	 * @param userId
	 * @param password
	 * @return
	 */
	public static PasswordAuthenticationFailureLog failedNow(String userId, String password) {
		return new PasswordAuthenticationFailureLog(GeneralDateTime.now() , userId, password);
	}
}
