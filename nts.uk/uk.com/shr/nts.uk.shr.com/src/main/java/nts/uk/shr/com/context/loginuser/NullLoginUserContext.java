package nts.uk.shr.com.context.loginuser;

import java.io.Serializable;

import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;
import nts.uk.shr.com.context.loginuser.role.DefaultLoginUserRoles;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

public class NullLoginUserContext implements LoginUserContext, Serializable {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	@Override
	public boolean hasLoggedIn() {
		return false;
	}

	@Override
	public boolean isEmployee() {
		return false;
	}

	@Override
	public String userId() {
		return "";
	}

	@Override
	public String personId() {
		return "";
	}

	@Override
	public String contractCode() {
		return AppContexts.system().isCloud() ? "" : AppContexts.system().getTenantCodeOnPremise().get();
	}

	@Override
	public String companyId() {
		return "";
	}

	@Override
	public String companyCode() {
		return "";
	}

	@Override
	public String employeeId() {
		return "";
	}

	@Override
	public String employeeCode() {
		return "";
	}

	@Override
	public LoginUserRoles roles() {
		return new DefaultLoginUserRoles();
	}

	@Override
	public SelectedLanguage language() {
		return new SelectedLanguage();
	}

}
