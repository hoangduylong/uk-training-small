package nts.uk.ctx.sys.gateway.dom.login.password.userpassword;

import java.util.List;
import java.util.Optional;

import lombok.val;
import nts.arc.error.BundledBusinessException;
import nts.arc.task.tran.AtomTask;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.PasswordPolicy;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.password.ViolationInfo;

/**
 * ユーザーのログインパスワードを変更する
 */
public class ChangeLoginPasswordOfUser {
	
	public static AtomTask change(Require require, String userId, String currentPassword, String newPassword, String confirmPassword) {
		
		require.getLoginPasswordOfUser(userId).ifPresent(userPassword -> {
			if (!userPassword.matches(currentPassword)) {
				throw bundled("Msg_302");
			}
		});

		return change(require, userId, newPassword, confirmPassword);
	}
	
	public static AtomTask change(Require require, String userId, String newPassword, String confirmPassword) {

		// 本来、このチェックはUI側でやれば済む内容ではあるが、サーバ側でのチェックを前提とした利用箇所が多いので、
		// それらUI側の変更をせずに済むよう、ここでチェックを入れる
		if (!newPassword.equals(confirmPassword)) {
			throw bundled("Msg_961");
		}
		
		return change(require, userId, newPassword);
	}
	
	public static AtomTask change(Require require, String userId, String newPassword) {
		
		val userPassword = require.getLoginPasswordOfUser(userId)
				.orElse(LoginPasswordOfUser.empty(userId));
		
		userPassword.change(newPassword, GeneralDateTime.now());
		
		// パスワードポリシーの検証
		val policy = require.getPasswordPolicy();
		val violations = policy.validate(userPassword, newPassword);
		if (!violations.isEmpty()) {
			throw bundled(violations);
		}
		
		return AtomTask.of(() -> {
			require.save(userPassword);
		});
	}
	
	private static BundledBusinessException bundled(String messageId) {
		// 通常であればBusinessException単体でいいが、既存の呼び出し側がBundledを前提としている
		val ex = BundledBusinessException.newInstance();
		ex.addMessage(messageId);
		return ex;
	}
	
	private static BundledBusinessException bundled(List<ViolationInfo> violations) {
		val ex = BundledBusinessException.newInstance();
		violations.forEach(v -> ex.addMessage(v.toBusinessException()));
		return ex;
	}
	
	public static interface Require {
		
		PasswordPolicy getPasswordPolicy();
		
		Optional<LoginPasswordOfUser> getLoginPasswordOfUser(String userId);
		
		void save(LoginPasswordOfUser password);
	}
}
