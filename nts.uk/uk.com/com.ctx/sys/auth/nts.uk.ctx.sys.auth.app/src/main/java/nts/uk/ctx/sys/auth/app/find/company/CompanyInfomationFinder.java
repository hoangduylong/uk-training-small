package nts.uk.ctx.sys.auth.app.find.company;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.dom.adapter.company.CompanyAdapter;
import nts.uk.ctx.sys.auth.dom.adapter.company.CompanyImport;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;

@Stateless
public class CompanyInfomationFinder {

	/** The company adapter. */
	@Inject
	private CompanyAdapter companyAdapter;

	/** The Constant NO_SELECTION. */
//	private static final String NO_SELECTION = "会社";

	/**
	 * Gets the company list.
	 *
	 * @return the company list
	 */
	public List<CompanyDto> getCompanyList() {
		List<CompanyImport> listCompany = new ArrayList<>();
		List<CompanyDto> listCompanyDTO = new ArrayList<CompanyDto>();
		LoginUserContext user = AppContexts.user();
		if (user.roles().forSystemAdmin() != null) {
			// Get list Company Information
//			listCompany.add(new CompanyImport("No-Selection", NO_SELECTION, user.companyId(), 0));
			listCompany.addAll(companyAdapter.findAllCompanyImport());
		} else {
			// get company by cid
			listCompany.add(companyAdapter.findCompanyByCid(user.companyId()));
		}
		listCompany.stream().map(c -> {
			return listCompanyDTO.add(new CompanyDto(c.getCompanyCode(), c.getCompanyName(), c.getCompanyId()));
		}).collect(Collectors.toList());

		return listCompanyDTO;
	}
}
