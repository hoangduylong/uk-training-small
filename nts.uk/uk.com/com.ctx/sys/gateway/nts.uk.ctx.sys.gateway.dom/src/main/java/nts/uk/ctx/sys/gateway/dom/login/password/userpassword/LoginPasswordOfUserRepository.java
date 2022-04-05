package nts.uk.ctx.sys.gateway.dom.login.password.userpassword;

import java.util.Optional;

public interface LoginPasswordOfUserRepository {
	
	void save(LoginPasswordOfUser password);
	
	void delete(String userId);
	
	Optional<LoginPasswordOfUser> find(String userId);
}
