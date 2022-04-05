/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.pubimp.grant;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrant;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrantRepository;
import nts.uk.ctx.sys.auth.dom.role.RoleType;
import nts.uk.ctx.sys.auth.pub.grant.RoleIndividualGrantEx;
import nts.uk.ctx.sys.auth.pub.grant.RoleIndividualGrantExport;
import nts.uk.ctx.sys.auth.pub.grant.RoleIndividualGrantExportRepo;

/**
 * The Class RoleIndividualGrantExportRepoImpl.
 */
@Stateless
public class RoleIndividualGrantExportRepoImpl implements RoleIndividualGrantExportRepo {

	/** The role individual grant repository. */
	@Inject
	private RoleIndividualGrantRepository roleIndividualGrantRepository;

	@Override
	public RoleIndividualGrantExport getByUserAndRoleType(String userId, Integer roleType) {
		List<RoleIndividualGrant> roleIndividualGrant = roleIndividualGrantRepository.findByUserAndRole(userId,
				RoleType.valueOf(roleType).value);
		if (roleIndividualGrant.isEmpty()) {
			return null;
		}
		return new RoleIndividualGrantExport(roleIndividualGrant.get(0).getRoleId());
	}

	@Override
	public List<RoleIndividualGrantExport> getByUser(String userId) {
		return roleIndividualGrantRepository.findListByUserAndDate(userId, GeneralDate.today()).stream()
				.map(r -> new RoleIndividualGrantExport(r.getRoleId())).collect(Collectors.toList());
	}

	@Override
	public Optional<RoleIndividualGrantExport> getByUserCompanyRoleTypeDate(String userId, String companyId,
			int roleType, GeneralDate date) {
		return roleIndividualGrantRepository.findByUserCompanyRoleTypeDate(userId, companyId, roleType, date)
				.map(r -> new RoleIndividualGrantExport(r.getRoleId()));
	}

	@Override
	public List<RoleIndividualGrantEx> getByUserIDDateRoleType(String userID, GeneralDate date, int roleType) {
		List<RoleIndividualGrant> roleIndividualGrant = roleIndividualGrantRepository
				.findListByUserAndDateForCompanyAdmin(userID, date, RoleType.valueOf(roleType));
		List<RoleIndividualGrantEx> result = new ArrayList<RoleIndividualGrantEx>();
		if (roleIndividualGrant.isEmpty()) {
			return new ArrayList<>();
		}

		for (RoleIndividualGrant roleIndividual : roleIndividualGrant) {
			RoleIndividualGrantEx roleEx = new RoleIndividualGrantEx();
			roleEx.setUserId(roleIndividual.getUserId());
			roleEx.setRoleId(roleIndividual.getRoleId());
			roleEx.setCompanyId(roleIndividual.getCompanyId());
			roleEx.setRoleType(roleIndividual.getRoleType().value);
			roleEx.setValidPeriod(roleIndividual.getValidPeriod());
			result.add(roleEx);

		}
		return result;
	}

	@Override
	public List<RoleIndividualGrantEx> getListDifRoleType(String userId, String companyId, int roleType,
			GeneralDate date) {
		return roleIndividualGrantRepository.getListDifRoleType(userId, companyId, roleType, date).stream()
				.map(c -> new RoleIndividualGrantEx(c.getUserId(), c.getRoleId(), c.getCompanyId(), c.getRoleType().value, c.getValidPeriod()))
				.collect(Collectors.toList());
	}

	@Override
	public Optional<RoleIndividualGrantEx> findByUserCompanyRoleTypeDate(String userId, String companyId, int roleType,
			GeneralDate date) {
		return roleIndividualGrantRepository.findByUserCompanyRoleTypeDate(userId, companyId, roleType, date)
				.map(c -> new RoleIndividualGrantEx(c.getUserId(), c.getRoleId(), c.getCompanyId(), c.getRoleType().value, c.getValidPeriod()));
	}

}
