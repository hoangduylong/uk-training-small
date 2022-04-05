/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pubimp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.adapter.employee.EmployeeAdapter;
import nts.uk.ctx.sys.auth.dom.employee.dto.EmployeeImport;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrant;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrantRepository;
import nts.uk.ctx.sys.auth.dom.role.Role;
import nts.uk.ctx.sys.auth.dom.role.RoleRepository;
import nts.uk.ctx.sys.auth.dom.role.RoleType;
import nts.uk.ctx.sys.auth.pub.service.ListCompanyService;

/**
 * The Class ListCompanyServiceImpl.
 */
@Stateless
public class ListCompanyServiceImpl implements ListCompanyService {

	/** The role individual grant repository. */
	@Inject
	private RoleIndividualGrantRepository roleIndividualGrantRepository;
	
	/** The role repository. */
	@Inject 
	private RoleRepository roleRepository;
	
	@Inject 
	private EmployeeAdapter employeeAdapter;
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.auth.pub.service.ListCompanyService#getListCompanyId(java.lang.String)
	 */
	@Override
	public List<String> getListCompanyId(String userId,String associatedPersonId) {
		List<String> lstCompanyId = new ArrayList<String>();
		List<String> lstRoleId = new ArrayList<String>();
		
		// get roleIndividualGrant
		List<RoleIndividualGrant> lstIndividualGrant = roleIndividualGrantRepository.findListByUserAndDateForCompanyAdmin(userId, GeneralDate.today(),RoleType.COMPANY_MANAGER);
		//add list roleId
		lstIndividualGrant.stream().forEach(item-> {
			lstRoleId.add(item.getRoleId());
		});
		
		// get roles by roleId
		List<Role> lstRole = roleRepository.findByListId(lstRoleId);
		
		// get list employee imported by User associated Id #No.124
		List<EmployeeImport> lstEm = employeeAdapter.findByEmployeeId(associatedPersonId);

		// merge duplicate companyId from lstRole and lstEm
		for (Role item : lstRole) {
			if (item.getCompanyId() != null) {
				lstCompanyId.add(item.getCompanyId());
			}
		}

		for (EmployeeImport em : lstEm) {
			if (em.getCompanyId() != null) {
				lstCompanyId.add(em.getCompanyId());
			}
		}
		return lstCompanyId.stream().distinct().collect(Collectors.toList());
	}

}
