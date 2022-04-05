package nts.uk.shr.com.context.loginuser;

import java.io.Serializable;

import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.val;
import nts.gul.misc.DeepClonable;
import nts.uk.shr.com.context.LoginUserContext;
import nts.uk.shr.com.context.loginuser.role.DefaultLoginUserRoles;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

@RequiredArgsConstructor
public class DefaultLoginUserContext implements LoginUserContext, DeepClonable<DefaultLoginUserContext>, Serializable {
	
	/** serialVersionUID */
	private static final long serialVersionUID = 1L;

	private final String userId;
	
	private final boolean isEmployee;
	
	@Setter
	private String personId;
	
	@Setter
	private String contractCode;
	
	@Setter
	private String companyId;
	
	@Setter
	private String companyCode;
	
	@Setter
	private String employeeId;
	
	@Setter
	private String employeeCode;
	
	private final DefaultLoginUserRoles roles = new DefaultLoginUserRoles();
	
	private SelectedLanguage language = new SelectedLanguage();

	@Override
	public boolean hasLoggedIn() {
		return true;
	}
	
	@Override
	public boolean isEmployee() {
		return this.isEmployee;
	}
	
	@Override
	public String userId() {
		return this.userId;
	}
	
	@Override
	public String personId() {
		return this.personId;
	}
	@Override
	public String contractCode() {
		return this.contractCode;
	}
	@Override
	public String companyId() {
		return this.companyId;
	}
	@Override
	public String companyCode() {
		return this.companyCode;
	}
	@Override
	public String employeeId() {
		return this.employeeId;
	}
	@Override
	public String employeeCode() {
		return this.employeeCode;
	}

	@Override
	public LoginUserRoles roles() {
		return this.roles;
	}

	@Override
	public SelectedLanguage language() {
		return this.language;
	}
	
	@Override
	public DefaultLoginUserContext deepClone() {
		val clone = new DefaultLoginUserContext(this.userId, this.isEmployee);
		clone.setCompanyCode(companyCode);
		clone.setCompanyId(companyId);
		clone.setContractCode(contractCode);
		clone.setEmployeeCode(employeeCode);
		clone.setEmployeeId(employeeId);
		clone.setPersonId(personId);
		clone.roles.restore(this.roles);
		clone.language.restore(this.language);
		return clone;
	}
}
