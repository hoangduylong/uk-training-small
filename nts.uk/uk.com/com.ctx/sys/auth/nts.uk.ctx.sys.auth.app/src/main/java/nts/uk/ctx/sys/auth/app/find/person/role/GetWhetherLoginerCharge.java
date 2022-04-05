package nts.uk.ctx.sys.auth.app.find.person.role;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.dom.role.Role;
import nts.uk.ctx.sys.auth.dom.role.RoleAtr;
import nts.uk.ctx.sys.auth.dom.role.RoleRepository;

import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;
@Stateless
public class GetWhetherLoginerCharge {
	
	@Inject
	private RoleRepository roleRepo;
	
	//Logic request list 50
	public RoleWhetherLoginDto getWhetherLoginerCharge(){

		return getWhetherLoginerCharge(AppContexts.user().roles());
	}
	
	public RoleWhetherLoginDto getWhetherLoginerCharge(LoginUserRoles roles){
		String employmentRoleID = roles.forAttendance();
		String salaryRoleID = roles.forPayroll();
		String humanResourceRoleID = roles.forPersonnel();
		String officeHelperRoleID = roles.forOfficeHelper();
		String personalInforRoleID = roles.forPersonalInfo();

		RoleWhetherLoginDto outputRole = new RoleWhetherLoginDto();
		Optional<Role> roleEmployment = roleRepo.findByRoleId(employmentRoleID);
		if (roleEmployment.isPresent()) {
			if (roleEmployment.get().getAssignAtr().equals(RoleAtr.INCHARGE)) {
				outputRole.setEmployeeCharge(true);
			}
		}
		Optional<Role> roleSalaryRole = roleRepo.findByRoleId(salaryRoleID);
		if (roleSalaryRole.isPresent()) {
			if (roleSalaryRole.get().getAssignAtr().equals(RoleAtr.INCHARGE)) {
				outputRole.setSalaryProfessional(true);
			}
		}

		Optional<Role> roleHumanResource = roleRepo.findByRoleId(humanResourceRoleID);
		if (roleHumanResource.isPresent()) {
			if (roleHumanResource.get().getAssignAtr().equals(RoleAtr.INCHARGE)) {
				outputRole.setHumanResOfficer(true);
			}
		}

		Optional<Role> roleOfficeHelper = roleRepo.findByRoleId(officeHelperRoleID);
		if (roleOfficeHelper.isPresent()) {
			if (roleOfficeHelper.get().getAssignAtr().equals(RoleAtr.INCHARGE)) {
				outputRole.setOfficeHelperPersonne(true);
			}
		}

		Optional<Role> rolePersonalInfor = roleRepo.findByRoleId(personalInforRoleID);
		if (rolePersonalInfor.isPresent()) {
			if (rolePersonalInfor.get().getAssignAtr().equals(RoleAtr.INCHARGE)) {
				outputRole.setPersonalInformation(true);
			}
		}

		return outputRole;
	}
}
