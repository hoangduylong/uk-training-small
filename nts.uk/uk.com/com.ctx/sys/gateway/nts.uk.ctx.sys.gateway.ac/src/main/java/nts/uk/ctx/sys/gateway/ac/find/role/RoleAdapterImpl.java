/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.ac.find.role;

import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.pub.role.RoleExport;
import nts.uk.ctx.sys.auth.pub.role.RoleExportRepo;
import nts.uk.ctx.sys.auth.pub.role.RoleWhetherLoginPubExport;
import nts.uk.ctx.sys.gateway.dom.loginold.adapter.RoleAdapter;
import nts.uk.ctx.sys.gateway.dom.loginold.dto.RoleImport;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

@Stateless
public class RoleAdapterImpl implements RoleAdapter {

	@Inject
	private RoleExportRepo roleExportRepo;

	@Override
	public List<RoleImport> getAllById(String roleId) {
		List<RoleExport> listExport = this.roleExportRepo.findById(roleId);
		return listExport.stream().map(c -> {
			return new RoleImport(c.getRoleId(), c.getCompanyId());
		}).collect(Collectors.toList());
	}

	@Override
	public boolean isEmpWhetherLoginerCharge() {
		RoleWhetherLoginPubExport result = roleExportRepo.getWhetherLoginerCharge();
		return result.isEmployeeCharge() ||
				result.isHumanResOfficer() ||
				result.isOfficeHelperPersonne() ||
				result.isPersonalInformation() ||
				result.isSalaryProfessional();
	}

	@Override
	public boolean isEmpWhetherLoginerCharge(LoginUserRoles roles) {
		RoleWhetherLoginPubExport result = roleExportRepo.getWhetherLoginerCharge(roles);
		return result.isEmployeeCharge() ||
				result.isHumanResOfficer() ||
				result.isOfficeHelperPersonne() ||
				result.isPersonalInformation() ||
				result.isSalaryProfessional();
	}
}
