/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.ac.role.workplace;

import java.util.Optional;
import java.util.OptionalInt;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.dom.access.role.SyRoleAdapter;
import nts.uk.ctx.bs.employee.dom.access.role.WorkplaceIDImport;
import nts.uk.ctx.bs.employee.dom.employee.service.EmployeeReferenceRangeImport;
import nts.uk.ctx.sys.auth.pub.role.RoleExportRepo;
import nts.uk.ctx.sys.auth.pub.role.WorkplaceIdExport;

/**
 * The Class SyRoleAdapterImpl.
 */
@Stateless
public class SyRoleAdapterImpl implements SyRoleAdapter {

	/** The role export repo. */
	@Inject
	private RoleExportRepo roleExportRepo;

	/*
	 * ロールIDから参照可能な職場リストを取得する
	 */
	@Override
	public WorkplaceIDImport findListWkpIdByRoleId(Integer systemType, GeneralDate baseDate) {

		WorkplaceIDImport workplaceIDImport = new WorkplaceIDImport();

		WorkplaceIdExport workplaceIdExport = roleExportRepo.findWorkPlaceIdByRoleId(systemType, baseDate, Optional.empty());
		workplaceIDImport.setIsAllEmp(workplaceIdExport.getIsAllEmp());
		workplaceIDImport.setListWorkplaceIds(workplaceIdExport.getListWorkplaceIds());

		return workplaceIDImport;
	}

	@Override
	public WorkplaceIDImport findListWkpId(Integer systemType) {
		WorkplaceIDImport workplaceIDImport = new WorkplaceIDImport();

		WorkplaceIdExport workplaceIdExport = roleExportRepo.findWorkPlaceIdNoRole(systemType);
		workplaceIDImport.setIsAllEmp(workplaceIdExport.getIsAllEmp());
		workplaceIDImport.setListWorkplaceIds(workplaceIdExport.getListWorkplaceIds());

		return workplaceIDImport;
	}
	
	@Override
	public EmployeeReferenceRangeImport getRangeByRoleID(String roleID) {
		OptionalInt data = roleExportRepo.findEmpRangeByRoleID(roleID);
		if(!data.isPresent()){
			throw new RuntimeException("Can't get Role ID");
		}
		EmployeeReferenceRangeImport reuslt =  EmployeeReferenceRangeImport.valueOf(data.getAsInt());
		return reuslt;
	}
	
	

}
