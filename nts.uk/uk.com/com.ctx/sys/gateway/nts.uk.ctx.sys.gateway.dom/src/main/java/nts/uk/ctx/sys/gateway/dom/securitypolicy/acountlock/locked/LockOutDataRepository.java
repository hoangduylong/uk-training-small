/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked;

import java.util.List;
import java.util.Optional;

/**
 * The Interface LogoutDataRepository.
 */
public interface LockOutDataRepository {
	
	void add(LockoutData domain);

	void remove(List<String> usersID);

	Optional<LockoutData> find(String userId);
	
	List<LockoutData> findByContractCode(String contractCode);
}
