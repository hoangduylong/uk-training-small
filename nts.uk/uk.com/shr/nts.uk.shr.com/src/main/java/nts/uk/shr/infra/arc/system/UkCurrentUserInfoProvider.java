package nts.uk.shr.infra.arc.system;

import java.util.HashMap;
import java.util.Map;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.system.CurrentUserInfoProvider;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class UkCurrentUserInfoProvider implements CurrentUserInfoProvider {

	@Override
	public Map<String, String> allInfo() {
		val user = AppContexts.user();
		val result = new HashMap<String, String>();
		
		result.put("UserID", user.userId());
		result.put("CompanyId", user.companyId());
		result.put("EmployeeID", user.employeeId());
		
		return result;
	}
}
