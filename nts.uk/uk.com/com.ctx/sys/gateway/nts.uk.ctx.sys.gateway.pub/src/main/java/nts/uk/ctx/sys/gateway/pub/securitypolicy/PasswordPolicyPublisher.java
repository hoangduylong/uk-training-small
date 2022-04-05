package nts.uk.ctx.sys.gateway.pub.securitypolicy;

import java.util.Optional;

public interface PasswordPolicyPublisher {
	//パスワードポリシーを取得する request list 385
	Optional<PasswordPolicyDto> getPasswordPolicy(String contractCode);
	
	void updatePasswordPolicy(PasswordPolicyDto passwordPolicy);
}
