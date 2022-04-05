package nts.uk.ctx.sys.gateway.dom.login.password.userpassword;

import lombok.Value;
import nts.gul.security.hash.password.PasswordHash;

/**
 * ハッシュ化されたログインパスワード
 */
@Value
public class HashedLoginPassword {

	private final String hash;
	
	public static HashedLoginPassword hash(String passwordPlainText, String salt) {
		String hash = PasswordHash.generate(passwordPlainText, salt);
		return new HashedLoginPassword(hash);
	}
	
	/**
	 * パスワードを照合する
	 * @param matchingPasswordPlainText
	 * @param salt
	 * @return
	 */
	public boolean matches(String matchingPasswordPlainText, String salt) {
		String matchingHash = PasswordHash.generate(matchingPasswordPlainText, salt);
		return hash.equals(matchingHash);
	}
}
