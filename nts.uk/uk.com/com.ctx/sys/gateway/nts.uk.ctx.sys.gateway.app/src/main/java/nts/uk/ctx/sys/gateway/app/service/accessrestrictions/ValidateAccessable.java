package nts.uk.ctx.sys.gateway.app.service.accessrestrictions;

import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.val;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.AccessRestrictionsRepository;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.loginuser.SessionLowLayer;
import nts.uk.shr.com.net.Ipv4Address;
import nts.uk.shr.com.security.ipaddress.ValidateIpAddressService;

@Stateless
public class ValidateAccessable implements ValidateIpAddressService {
	
	@Inject AccessRestrictionsRepository accessRestrictionsRepository;
	
	@Inject SessionLowLayer session;
	
	@Override
	public boolean validate(Ipv4Address targetIpAddress) {
		
		// ログインしていないときはチェックしない
		if(!session.isLoggedIn()) {
			return true;
		}

		val tenantCode = AppContexts.user().contractCode();
		
		val restrictions = accessRestrictionsRepository.get(new ContractCode(tenantCode));
		
		// マスタが取得できなかった場合はチェックしない
		if(!restrictions.isPresent()) {
			return true;
		}
		return restrictions.get().isAccessable(targetIpAddress);
	}
}
