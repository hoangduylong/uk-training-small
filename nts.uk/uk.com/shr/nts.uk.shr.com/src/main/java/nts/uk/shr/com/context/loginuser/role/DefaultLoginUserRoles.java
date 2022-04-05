package nts.uk.shr.com.context.loginuser.role;

import java.io.Serializable;

public class DefaultLoginUserRoles implements LoginUserRoles, Serializable {

	/** serialVersionUID */
	private static final long serialVersionUID = 1L;
	
	private String forAttendance = null;
	private String forPayroll = null;
	private String forPersonnel = null;
	private String forPersonalInfo = null;
	private String forOfficeHelper = null;
	private String forSystemAdmin = null;
	private String forCompanyAdmin = null;
	private String forGroupCompaniesAdmin = null;
	private boolean isInChargeAttendance = false;
	private boolean isInChargePayroll = false;
	private boolean isInChargePersonnel = false;
	private boolean isInChargePersonalInfo = false;
	
	@Override
	public String forAttendance() {
		return this.forAttendance;
	}

	@Override
	public String forPayroll() {
		return this.forPayroll;
	}

	@Override
	public String forPersonnel() {
		return this.forPersonnel;
	}

	@Override
	public String forPersonalInfo() {
		return this.forPersonalInfo;
	}

	@Override
	public String forOfficeHelper() {
		return this.forOfficeHelper;
	}

	@Override
	public String forSystemAdmin() {
		return this.forSystemAdmin;
	}

	@Override
	public String forCompanyAdmin() {
		return this.forCompanyAdmin;
	}
	
	@Override
	public String forGroupCompaniesAdmin() {
		return this.forGroupCompaniesAdmin;
	}

	@Override
	public boolean isInChargeAttendance() {
		return this.isInChargeAttendance;
	}
	
	@Override
	public boolean isInChargePayroll() {
		return this.isInChargePayroll;
	}
	
	@Override
	public boolean isInChargePersonnel() {
		return this.isInChargePersonnel;
	}
	
	@Override
	public boolean isInChargePersonalInfo() {
		return this.isInChargePersonalInfo;
	}



	public void setRoleIdForAttendance(String roleId) {
		this.forAttendance = roleId;
	}

	public void setRoleIdForPayroll(String roleId) {
		this.forPayroll = roleId;
	}

	public void setRoleIdForPersonnel(String roleId) {
		this.forPersonnel = roleId;
	}

	public void setRoleIdforPersonalInfo(String roleId) {
		this.forPersonalInfo = roleId;
	}

	public void setRoleIdforOfficeHelper(String roleId) {
		this.forOfficeHelper = roleId;
	}

	public void setRoleIdforSystemAdmin(String roleId) {
		this.forSystemAdmin = roleId;
	}

	public void setRoleIdforCompanyAdmin(String roleId) {
		this.forCompanyAdmin = roleId;
	}

	public void setRoleIdforGroupCompaniesAdmin(String roleId) {
		this.forGroupCompaniesAdmin = roleId;
	}
	
	public void setIsInChargeAttendance(boolean isInCharge) {
		this.isInChargeAttendance = isInCharge;
	}

	public void setIsInChargePayroll(boolean isInCharge) {
		this.isInChargePayroll = isInCharge;
	}

	public void setIsInChargePersonnel(boolean isInCharge) {
		this.isInChargePersonnel = isInCharge;
	}

	public void setIsInChargePersonalInfo(boolean isInCharge) {
		this.isInChargePersonalInfo = isInCharge;
	}

	public void restore(LoginUserRoles source) {
		this.forAttendance = source.forAttendance();
		this.forPayroll = source.forPayroll();
		this.forPersonnel = source.forPersonnel();
		this.forPersonalInfo = source.forPersonalInfo();
		this.forOfficeHelper = source.forOfficeHelper();
		this.forSystemAdmin = source.forSystemAdmin();
		this.forCompanyAdmin = source.forCompanyAdmin();
		this.forGroupCompaniesAdmin = source.forGroupCompaniesAdmin();
		this.isInChargeAttendance = source.isInChargeAttendance();
		this.isInChargePayroll = source.isInChargePayroll();
		this.isInChargePersonnel = source.isInChargePersonnel();
		this.isInChargePersonalInfo = source.isInChargePersonalInfo();
	}
	
	public static DefaultLoginUserRoles cloneFrom(LoginUserRoles source){
		DefaultLoginUserRoles role = new DefaultLoginUserRoles();
		role.restore(source);
		return role;
	} 

}
