package nts.uk.ctx.sys.auth.app.find.registration.user;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.adapter.company.CompanyAdapter;
import nts.uk.ctx.sys.auth.dom.adapter.company.CompanyImport;
import nts.uk.ctx.sys.shared.dom.user.UserRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;

/**
 * The Class RegistrationUserFinder.
 */
@Stateless
public class RegistrationUserFinder {
	
	/** The company adapter. */
	@Inject
	private CompanyAdapter companyAdapter;
	
	/** The user repo. */
	@Inject
	private UserRepository userRepo;
	
	/** The Constant NO_SELECTION. */
	private static final String NO_SELECTION = "選択なし";

	/**
	 * Gets the company import list.
	 *
	 * @return the company import list
	 */
	public List<CompanyImportDto> getCompanyImportList() {
		List<CompanyImport> listCompanyImport = new ArrayList<>();
		LoginUserContext user = AppContexts.user();
		if(user.roles().forSystemAdmin() != null) {
			// Get list Company Information
			listCompanyImport.add(new CompanyImport("No-Selection", NO_SELECTION, "", 0));
			listCompanyImport.addAll(companyAdapter.findAllCompanyImport());
		}
		else {
			// get company by cid
			listCompanyImport.add(companyAdapter.findCompanyByCid(user.companyId()));
		}
		return listCompanyImport.stream().map(c -> CompanyImportDto.fromDomain(c)).collect(Collectors.toList());
	}
	
	/**
	 * Gets the login user list by current CID.
	 *
	 * @param cid the cid
	 * @return the login user list by current CID
	 */
	public List<UserDto> getLoginUserListByCurrentCID(String cid) {
		return userRepo.getListUserByCompanyId(cid, GeneralDate.today()).stream().map(c -> UserDto.fromDomain(c, cid))
				.collect(Collectors.toList());
	}

	/**
	 * Gets the login user list by contract code.
	 *
	 * @return the login user list by contract code
	 */
	public List<UserDto> getLoginUserListByContractCode() {
		return userRepo.getByContractCdAndAsIDNull(AppContexts.user().contractCode()).stream().map(c -> UserDto.fromDomain(c, null))
				.collect(Collectors.toList());
	}
}
