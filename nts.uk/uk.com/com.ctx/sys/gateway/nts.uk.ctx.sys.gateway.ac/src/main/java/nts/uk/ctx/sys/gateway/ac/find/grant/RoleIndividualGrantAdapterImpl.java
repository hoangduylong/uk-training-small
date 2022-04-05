/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.ac.find.grant;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.pub.grant.RoleIndividualGrantEx;
import nts.uk.ctx.sys.auth.pub.grant.RoleIndividualGrantExport;
import nts.uk.ctx.sys.auth.pub.grant.RoleIndividualGrantExportRepo;
import nts.uk.ctx.sys.gateway.dom.loginold.adapter.RoleIndividualGrantAdapter;
import nts.uk.ctx.sys.gateway.dom.loginold.dto.RoleIndividualGrantImport;
import nts.uk.ctx.sys.gateway.dom.role.RoleType;

/**
 * The Class RoleIndividualGrantAdapterImpl.
 */
@Stateless
public class RoleIndividualGrantAdapterImpl implements RoleIndividualGrantAdapter {

	/** The Role individual grant export repo. */
	@Inject
	private RoleIndividualGrantExportRepo roleIndividualGrantExportRepo;

	@Override
	public RoleIndividualGrantImport getByUserAndRole(String userId, RoleType roleType) {
		RoleIndividualGrantExport export = roleIndividualGrantExportRepo.getByUserAndRoleType(userId, roleType.value);
		if (export == null) {
			return null;
		}
		return new RoleIndividualGrantImport(export.getRoleId());
	}

	@Override
	public List<RoleIndividualGrantImport> getByUser(String userId) {
		List<RoleIndividualGrantExport> listExport = roleIndividualGrantExportRepo.getByUser(userId);
		return listExport.stream().map(c -> { return new RoleIndividualGrantImport(c.getRoleId()); }).collect(Collectors.toList());
	}
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.gateway.dom.login.adapter.RoleIndividualGrantAdapter#
	 * getByUserIDDateRoleType(java.lang.String, nts.arc.time.GeneralDate, int)
	 */
	@Override
	public List<RoleIndividualGrantImport> getByUserIDDateRoleType(String userId, GeneralDate date, int roleType) {
		List<RoleIndividualGrantEx> listExport = roleIndividualGrantExportRepo.getByUserIDDateRoleType(userId, date,
				roleType);
		return listExport.stream().map(c -> {
			return new RoleIndividualGrantImport(c.getRoleId());
		}).collect(Collectors.toList());
	}

	@Override
	public List<RoleIndividualGrantImport> getListDifRoleType(String userId, String companyId, int roleType,
			GeneralDate date) {
		return roleIndividualGrantExportRepo.getListDifRoleType(userId, companyId, roleType, date)
				.stream()
				.map(c -> new RoleIndividualGrantImport(c.getRoleId()))
				.collect(Collectors.toList());
	}

	@Override
	public Optional<RoleIndividualGrantImport> getByRoleType(String userId, String companyId, int roleType,
			GeneralDate date) {
		return roleIndividualGrantExportRepo.findByUserCompanyRoleTypeDate(userId, companyId, roleType, date).
					map(c -> new RoleIndividualGrantImport(c.getRoleId()));
	}
}