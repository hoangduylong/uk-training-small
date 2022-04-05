package nts.uk.ctx.sys.gateway.dom.securitypolicy.password;

import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;

public interface PasswordPolicyRepository {

	void insert(PasswordPolicy domain);

	void update(PasswordPolicy domain);

	void updatePasswordPolicy(PasswordPolicy passwordPolicy);
	
	PasswordPolicy getPasswordPolicy(String tenantCode);
	
	PasswordPolicy getPasswordPolicy(ContractCode contractCode);
}
