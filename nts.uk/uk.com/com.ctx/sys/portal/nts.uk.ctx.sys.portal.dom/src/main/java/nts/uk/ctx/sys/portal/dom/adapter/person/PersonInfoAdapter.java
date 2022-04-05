package nts.uk.ctx.sys.portal.dom.adapter.person;

import java.util.Optional;

public interface PersonInfoAdapter {
	
	String getBusinessName(String sId);
	
	Optional<String> getEmpName(String companyId, String employeeCode);
}
