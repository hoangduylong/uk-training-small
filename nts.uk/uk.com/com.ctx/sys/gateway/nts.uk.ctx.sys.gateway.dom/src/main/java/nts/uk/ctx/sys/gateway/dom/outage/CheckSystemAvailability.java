package nts.uk.ctx.sys.gateway.dom.outage;

import java.util.Optional;

import lombok.val;
import nts.uk.ctx.sys.gateway.dom.outage.company.PlannedOutageByCompany;
import nts.uk.ctx.sys.gateway.dom.outage.tenant.PlannedOutageByTenant;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

/**
 * システムが利用できるかチェックする
 */
public class CheckSystemAvailability {
	
	public static PlannedOutage.Status isAvailable(
			Require require,
			String tenantCode,
			String companyId,
			String userId) {

		val roles = require.getLoginUserRoles(userId);
		
		// テナント
		val tenantStatus = require.getPlannedOutageByTenant(tenantCode)
				.map(o -> o.statusFor(roles));
		
		if (tenantStatus.isPresent() && tenantStatus.get().isOutage()) {
			return tenantStatus.get();
		}
		
		// 会社
		val companyStatus = require.getPlannedOutageByCompany(companyId)
				.map(o -> o.statusFor(roles));
		
		if (companyStatus.isPresent() && companyStatus.get().isOutage()) {
			return companyStatus.get();
		}
		
		return PlannedOutage.Status.available();
	}
	
	public static interface Require {

		Optional<PlannedOutageByTenant> getPlannedOutageByTenant(String tenantCode);
		
		Optional<PlannedOutageByCompany> getPlannedOutageByCompany(String companyId);
		
		LoginUserRoles getLoginUserRoles(String userId);
	}
}
