package nts.uk.ctx.sys.auth.dom.adapter.securitypolicy;

import java.util.Optional;

public interface PasswordPolicyAdapter {
	Optional<PasswordPolicyImport> getPasswordPolicy(String contractCode);

	void updatePasswordPolicy(PasswordPolicyImport passwordPolicy);
}
