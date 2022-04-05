/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pubimp.role;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.OptionalInt;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.app.find.person.role.GetWhetherLoginerCharge;
import nts.uk.ctx.sys.auth.app.find.person.role.RoleWhetherLoginDto;
import nts.uk.ctx.sys.auth.app.find.role.workplace.RoleWorkplaceIDFinder;
import nts.uk.ctx.sys.auth.app.find.role.workplace.WorkplaceIdDto;
import nts.uk.ctx.sys.auth.app.find.role.workplace.WorkplaceParam;
import nts.uk.ctx.sys.auth.dom.algorithm.EmpReferenceRangeService;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrant;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrantRepository;
import nts.uk.ctx.sys.auth.dom.role.Role;
import nts.uk.ctx.sys.auth.dom.role.RoleAtr;
import nts.uk.ctx.sys.auth.dom.role.RoleRepository;
import nts.uk.ctx.sys.auth.dom.roleset.RoleSet;
import nts.uk.ctx.sys.auth.dom.roleset.service.RoleSetService;
import nts.uk.ctx.sys.auth.pub.role.OperableSystemExport;
import nts.uk.ctx.sys.auth.pub.role.RoleExport;
import nts.uk.ctx.sys.auth.pub.role.RoleExportRepo;
import nts.uk.ctx.sys.auth.pub.role.RoleSetExport;
import nts.uk.ctx.sys.auth.pub.role.RoleWhetherLoginPubExport;
import nts.uk.ctx.sys.auth.pub.role.RollInformationExport;
import nts.uk.ctx.sys.auth.pub.role.WorkplaceIdExport;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

/**
 * The Class RoleExportRepoImpl.
 */
@Stateless
public class RoleExportRepoImpl implements RoleExportRepo {

	/** The role repo. */
	@Inject
	private RoleRepository roleRepo;

	/** The role workplace ID finder. */
	@Inject
	private RoleWorkplaceIDFinder roleWorkplaceIDFinder;
	
	@Inject 
	private GetWhetherLoginerCharge app;
	
	@Inject
	private RoleIndividualGrantRepository roleIndividualGrantRepo;
	
	@Inject
	private RoleSetService roleSetService;

	@Inject
	private EmpReferenceRangeService empReferenceRangeService;
	

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.auth.pub.role.RoleExportRepo#findByListRoleId(java.lang.
	 * String, java.util.List)
	 */
	@Override
	public List<RoleExport> findByListRoleId(String companyId, List<String> lstRoleId) {
		List<Role> lstRole = roleRepo.findByListRoleId(companyId, lstRoleId);
		if (!lstRole.isEmpty()) {
			return lstRole.stream().map(role -> {
				return new RoleExport(role.getCompanyId(), role.getRoleId(), role.getRoleCode().v(),
						role.getName().v(), role.getAssignAtr().value, role.getEmployeeReferenceRange().value);
			}).collect(Collectors.toList());
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.auth.pub.role.RoleExportRepo#findWorkPlaceIdByRoleId(java.
	 * lang.Integer)
	 */
	@Override
	// ロールIDから参照可能な職場リストを取得する
	public WorkplaceIdExport findWorkPlaceIdByRoleId(Integer systemType, GeneralDate baseDate, Optional<Integer> employeeReferenceRange) {

		WorkplaceIdDto workplaceIdDto = roleWorkplaceIDFinder.findListWokplaceId(systemType, baseDate, employeeReferenceRange);

		WorkplaceIdExport workplaceIdExport = new WorkplaceIdExport();
		workplaceIdExport.setIsAllEmp(workplaceIdDto.getIsAllEmp());
		workplaceIdExport.setListWorkplaceIds(workplaceIdDto.getListWorkplaceIds());

		return workplaceIdExport;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.auth.pub.role.RoleExportRepo#findById(java.lang.String)
	 */
	@Override
	public List<RoleExport> findById(String roleId) {
		List<Role> lstRole = roleRepo.findById(roleId);
		if (!lstRole.isEmpty()) {
			return lstRole.stream().map(role -> {
				return new RoleExport(role.getCompanyId(), role.getRoleId(), role.getRoleCode().v(),
						role.getName().v(), role.getAssignAtr().value, role.getEmployeeReferenceRange().value);
			}).collect(Collectors.toList());
		}
		return null;
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.auth.pub.role.RoleExportRepo#findWorkPlaceIdNoRole(java.lang.Integer)
	 */
	@Override
	public WorkplaceIdExport findWorkPlaceIdNoRole(Integer systemType) {
		WorkplaceIdDto workplaceIdDto = roleWorkplaceIDFinder.findListWokplaceIdNoCheckRole(systemType);

		WorkplaceIdExport workplaceIdExport = new WorkplaceIdExport();
		workplaceIdExport.setIsAllEmp(workplaceIdDto.getIsAllEmp());
		workplaceIdExport.setListWorkplaceIds(workplaceIdDto.getListWorkplaceIds());

		return workplaceIdExport;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.auth.pub.role.RoleExportRepo
	 * #getWorkPlaceIdByEmployeeReferenceRange(nts.arc.time.GeneralDate,
	 * java.lang.Integer)
	 */
	@Override
	public List<String> getWorkPlaceIdByEmployeeReferenceRange(GeneralDate baseDate, Integer employeeReferenceRange) {
		WorkplaceParam param = new WorkplaceParam();
		param.setBaseDate(baseDate);
		param.setReferenceRange(employeeReferenceRange);
		return this.roleWorkplaceIDFinder.findListWorkplaceId(param);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.auth.pub.role.RoleExportRepo#findRoleIdBySystemType(java.
	 * lang.Integer)
	 */
	@Override
	public String findRoleIdBySystemType(Integer systemType) {
		return this.roleWorkplaceIDFinder.findRoleIdBySystemType(systemType);
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.auth.pub.role.RoleExportRepo#getWhetherLoginerCharge()
	 */
	@Override
	public RoleWhetherLoginPubExport getWhetherLoginerCharge() {
		RoleWhetherLoginDto data = app.getWhetherLoginerCharge();
		RoleWhetherLoginPubExport exData = new RoleWhetherLoginPubExport(
				data.isEmployeeCharge(),
				data.isSalaryProfessional(),
				data.isHumanResOfficer(),
				data.isOfficeHelperPersonne(),
				data.isPersonalInformation());
		return exData;
	}
	
	@Override
	public RoleWhetherLoginPubExport getWhetherLoginerCharge(LoginUserRoles roles) {
		RoleWhetherLoginDto data = app.getWhetherLoginerCharge(roles);
		RoleWhetherLoginPubExport exData = new RoleWhetherLoginPubExport(
				data.isEmployeeCharge(),
				data.isSalaryProfessional(),
				data.isHumanResOfficer(),
				data.isOfficeHelperPersonne(),
				data.isPersonalInformation());
		return exData;
	}

	@Override
	public OperableSystemExport getOperableSystem() {
		String attendanceRoleID = AppContexts.user().roles().forAttendance();
		String salaryRoleID = AppContexts.user().roles().forPayroll();
		String humanResourceRoleID = AppContexts.user().roles().forPersonnel();
		String officeHelperRoleID = AppContexts.user().roles().forOfficeHelper();

		OperableSystemExport outputRole = new OperableSystemExport(false, false, false, false);
		Optional<Role> roleAttendance = roleRepo.findByRoleId(attendanceRoleID);
		if (roleAttendance.isPresent()) {
			if (roleAttendance.get().getAssignAtr().equals(RoleAtr.INCHARGE)) {
				outputRole.setAttendance(true);
			}
		}
		Optional<Role> roleSalaryRole = roleRepo.findByRoleId(salaryRoleID);
		if (roleSalaryRole.isPresent()) {
			if (roleSalaryRole.get().getAssignAtr().equals(RoleAtr.INCHARGE)) {
				outputRole.setSalary(true);
			}
		}

		Optional<Role> roleHumanResource = roleRepo.findByRoleId(humanResourceRoleID);
		if (roleHumanResource.isPresent()) {
			if (roleHumanResource.get().getAssignAtr().equals(RoleAtr.INCHARGE)) {
				outputRole.setHumanResource(true);
				;
			}
		}

		Optional<Role> roleOfficeHelper = roleRepo.findByRoleId(officeHelperRoleID);
		if (roleOfficeHelper.isPresent()) {
			if (roleOfficeHelper.get().getAssignAtr().equals(RoleAtr.INCHARGE)) {
				outputRole.setOfficeHelper(true);
			}
		}

		return outputRole;
	}

	@Override
	public OptionalInt findEmpRangeByRoleID(String roleID) {
		Optional<Role> optRole = roleRepo.findByRoleId(roleID);
		if (!optRole.isPresent()) {
			return OptionalInt.empty();
		} else {
			int result = optRole.get().getEmployeeReferenceRange().value;
			return OptionalInt.of(result);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.auth.pub.role.RoleExportRepo#findByRoleId(java.lang.
	 * String)
	 */
	@Override
	public Optional<RoleExport> findByRoleId(String roleId) {
		Optional<Role> optRole = roleRepo.findByRoleId(roleId);
		if (!optRole.isPresent()) {
			return Optional.empty();
		}

		Role role = optRole.get();

		return Optional
				.of(new RoleExport(role.getCompanyId(), role.getRoleId(), role.getRoleCode().v(),
						role.getName().v(), role.getAssignAtr().value, role.getEmployeeReferenceRange().value));
	}

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.auth.pub.role.RoleExportRepo#getCurrentLoginerRole()
	 */
	@Override
	public RoleWhetherLoginPubExport getCurrentLoginerRole() {
		RoleWhetherLoginDto data = app.getWhetherLoginerCharge();
		RoleWhetherLoginPubExport exData = new RoleWhetherLoginPubExport(
				data.isEmployeeCharge(),
				data.isSalaryProfessional(),
				data.isHumanResOfficer(),
				data.isOfficeHelperPersonne(),
				data.isPersonalInformation());
		return exData;
	}
	
	@Override
	public Map<String, String> getNameLstByRoleIds(String cid, List<String> roleIds) {
		Map<String, String> result = this.roleRepo.findRoleIdAndNameByListRoleId(cid, roleIds.stream().distinct().collect(Collectors.toList()));
		return result;
	}

	@Override
	public RollInformationExport getRoleIncludCategoryFromUserID(String userId, int roleType, GeneralDate baseDate, String companyId) {
		
		// ドメインモデル「ロール個人別付与」を取得する (Lấy DomainModel 「ロール個人別付与」)
		Optional<RoleIndividualGrant> roleIndOpt = roleIndividualGrantRepo.findByUserCompanyRoleTypeDate(userId, companyId, roleType, baseDate);
		if(roleIndOpt.isPresent()) {
			RollInformationExport result = new RollInformationExport(true, roleIndOpt.get().getRoleId());
			return result;
		}
		
		// アルゴリズム「ユーザIDからロールセットを取得する」を実行する(thuc hiện thuat toán 「ユーザIDからロールセットを取得する」)
		Optional<RoleSet> roleSetOpt =  roleSetService.getRoleSetFromUserId( userId,  baseDate);
		if (roleSetOpt.isPresent()) {
			Optional<String> roleID;
			switch (roleType) {
			case 3: // EMPLOYMENT
				roleID = roleSetOpt.get().getEmploymentRoleId(); break;
			case 4: // SALARY
				roleID = roleSetOpt.get().getSalaryRoleId(); break;
			case 5: // HUMAN_RESOURCE
				roleID  = roleSetOpt.get().getHRRoleId(); break;
			case 6: // OFFICE_HELPER
				roleID  = roleSetOpt.get().getOfficeHelperRoleId(); break;
			case 7: // MY_NUMBER
				roleID  = roleSetOpt.get().getMyNumberRoleId(); break;
			case 8: // PERSONAL_INFO
				roleID  = roleSetOpt.get().getPersonInfRoleId(); break;
			default:
				roleID = Optional.empty(); break;
			}
			
			if(roleID.isPresent()) {
				return new RollInformationExport(false, roleID.get());
			}
			
		}
		
		return null;
	}

	/**
	 * Gets the role set from user id.
	 * RQ.ユーザIDからロールセットを取得する
	 * @param userId the user id
	 * @param baseDate the base date
	 * @return the role set from user id
	 */
	@Override
	public Optional<RoleSetExport> getRoleSetFromUserId(String userId, GeneralDate baseDate) {
		Optional<RoleSet> roleSetOpt =  roleSetService.getRoleSetFromUserId( userId,  baseDate);
 		return roleSetOpt.map(domain -> convertToDto(domain));
	}
	
	private RoleSetExport convertToDto(RoleSet domain) {
		RoleSetExport roleSetExport = new RoleSetExport();
		roleSetExport.setCompanyId(domain.getCompanyId());
		roleSetExport.setRoleSetCd(domain.getRoleSetCd().v());
		roleSetExport.setRoleSetName(domain.getRoleSetName().v());
		
		if(domain.getEmploymentRoleId().isPresent()) {
			roleSetExport.setEmploymentRoleId(domain.getEmploymentRoleId().get());
		}
		
		if(domain.getPersonInfRoleId().isPresent()) {
			roleSetExport.setPersonInfRoleId(domain.getPersonInfRoleId().get());
		}
		
		if(domain.getHRRoleId().isPresent()) {
			roleSetExport.setHRRoleId(domain.getHRRoleId().get());
		}
		
		if(domain.getSalaryRoleId().isPresent()) {
			roleSetExport.setSalaryRoleId(domain.getSalaryRoleId().get());
		}
		
		if(domain.getMyNumberRoleId().isPresent()) {
			roleSetExport.setMyNumberRoleId(domain.getMyNumberRoleId().get());
		}
		
		if(domain.getOfficeHelperRoleId().isPresent()) {
			roleSetExport.setOfficeHelperRoleId(domain.getOfficeHelperRoleId().get());
		}
    	return roleSetExport;
    }

	/**
	 * find by company
	 *
	 * @param companyId
	 * @return Role
	 */
	@Override
	public List<RoleExport> findByCompanyId(String companyId) {
		List<Role> lstRole = roleRepo.findByCompanyId(companyId);
		if (!lstRole.isEmpty()) {
			return lstRole.stream().map(role -> {
				return new RoleExport(role.getCompanyId(), role.getRoleId(), role.getRoleCode().v(),
						role.getName().v(), role.getAssignAtr().value, role.getEmployeeReferenceRange().value);
			}).collect(Collectors.toList());
		}
		return null;
	}
	@Override
	public Integer getEmployeeReferenceRange(String userId, int roleType, GeneralDate referenceDate) {
		// TODO Auto-generated method stub
		return empReferenceRangeService.getByUserIDAndReferenceDate(userId, roleType, referenceDate).map(c->c.getEmployeeReferenceRange().value).orElse(null);
	}

}
