package nts.uk.ctx.sys.gateway.dom.login.password.authenticate;

import java.util.List;

import nts.arc.time.GeneralDateTime;

public interface PasswordAuthenticationFailureLogRepository {
	
	void insert(PasswordAuthenticationFailureLog domain);
	
	List<PasswordAuthenticationFailureLog> find(String userId);
	
	List<PasswordAuthenticationFailureLog> find(String userId, GeneralDateTime startDateTime, GeneralDateTime endDateTime);
}
