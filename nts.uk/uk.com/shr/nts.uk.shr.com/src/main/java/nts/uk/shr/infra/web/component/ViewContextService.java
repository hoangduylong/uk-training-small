package nts.uk.shr.infra.web.component;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.LoginUserContext;
import nts.uk.shr.com.context.loginuser.SelectedLanguage;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

@Path("view-context")
@Produces("application/json")
public class ViewContextService {
	

	@POST
	@Path("user")
	public UserInfo getLoginUserInfo() {
		LoginUserContext userInfo = AppContexts.user();
		UserInfo result = new UserInfo();
		
		result.contractCode = userInfo.contractCode();
		result.companyId = userInfo.companyId(); 
		result.companyCode = userInfo.companyCode();
		result.employee = userInfo.isEmployee();
		result.employeeId = userInfo.employeeId();
		result.employeeCode = userInfo.employeeCode();
		
		if (userInfo.roles() != null ) {
			result.role = getRole(userInfo.roles());
		}
		
		if (userInfo.language() != null ) {
			result.selectedLanguage = getSelectedLanguage(userInfo.language());
		}
		
		return result;
	}
	
	private Role getRole(LoginUserRoles userRole) {
		Role role = new Role();
		role.attendance = userRole.forAttendance();
		role.companyAdmin = userRole.forCompanyAdmin();
		role.groupCompanyAdmin = userRole.forGroupCompaniesAdmin();
		role.officeHelper = userRole.forOfficeHelper();
		role.payroll = userRole.forPayroll();
		role.personalInfo = userRole.forPersonalInfo();
		role.personnel = userRole.forPersonnel();
		role.systemAdmin = userRole.forSystemAdmin();
		
		return role;
	}
	
	private Language getSelectedLanguage(SelectedLanguage language) {
		Language sl = new Language();
		sl.basicLanguageId = language.basicLanguageId();
		sl.personNameLanguageId = language.personNameLanguageId();
		return sl;
	}
	
	class UserInfo {
		String contractCode;
		String companyId;
		String companyCode;
		
		boolean employee;
		
		String employeeId;
		String employeeCode;
		
		Role role;
		Language selectedLanguage;
		
		public String getConstractCode() { return this.contractCode;}
		public String getCompanyId() { return this.companyId;}
		public String getCompanyCode() { return this.companyCode;}
		
		public boolean isEmployee() { return this.employee;}
		
		public String getEmployeeId() { return this.employeeId;}
		public String getEmployeeCode() { return this.employeeCode;}
		
		public Role getRole() { return this.role;} 
		public Language getSelectedLanguage() { return this.selectedLanguage;}
	}
	
	class Role {
		String attendance;
		String companyAdmin;
		String groupCompanyAdmin;
		String officeHelper;
		String payroll;
		String personalInfo;
		String personnel;
		String systemAdmin;
		
		public String getAttendance() { return this.attendance;}
		public String getCompanyAdmin() { return this.companyAdmin;}
		public String getGroupCompanyAdmin() { return this.groupCompanyAdmin;}
		public String getOfficeHelper() { return this.officeHelper;}
		public String getPayroll() { return this.payroll;}
		public String getPersonalInfo() { return this.personalInfo;}
		public String getPersonnel() { return this.personnel;}
		public String getSystemAdmin() { return this.systemAdmin;}
	}
	
	class Language {
		String basicLanguageId;
		String personNameLanguageId;
		
		public String getBasicLanguageId() {
			return this.basicLanguageId;
		}
		
		public String getPersonNameLanguageId() {
			return this.personNameLanguageId;
		}
	}
	
}
