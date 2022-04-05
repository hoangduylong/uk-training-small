package nts.uk.ctx.sys.gateway.dom.login.password.identification;

import java.util.List;

public interface PasswordAuthIdentificationFailureLogRepository {

	void insert(PasswordAuthIdentificationFailureLog domain);
	
	List<PasswordAuthIdentificationFailureLog> find(String companyId);

}
