package nts.uk.ctx.sys.portal.dom.adapter.company;

import java.util.List;
import java.util.Optional;

public interface CompanyAdapter {
	
	List<String> getCompanyIdList(String userId, String contractCd);
	
	Optional<CompanyDto> getCompany(String companyId);
}
