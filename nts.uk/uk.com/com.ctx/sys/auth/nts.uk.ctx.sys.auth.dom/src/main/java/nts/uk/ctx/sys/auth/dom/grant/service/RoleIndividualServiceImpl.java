package nts.uk.ctx.sys.auth.dom.grant.service;

import java.util.ArrayList;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.ejb.Stateless;
import javax.inject.Inject;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrant;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrantRepository;
import nts.uk.ctx.sys.auth.dom.role.RoleType;
import nts.uk.ctx.sys.auth.dom.roleset.RoleSet;
import nts.uk.ctx.sys.auth.dom.roleset.service.RoleSetService;
import nts.uk.ctx.sys.shared.dom.user.User;
import nts.uk.ctx.sys.shared.dom.user.UserRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.arc.time.calendar.period.DatePeriod;

@Stateless
public class RoleIndividualServiceImpl implements RoleIndividualService {

	@Inject
	private RoleIndividualGrantRepository roleIndividualGrantRepo;

	@Inject
	private UserRepository userRepository;	
	
	@Inject
	private RoleSetService rolesetService;

	@Override
	public boolean checkSysAdmin(String userID, DatePeriod validPeriod) {

		List<RoleIndividualGrant> listRoleIndividualGrant = roleIndividualGrantRepo.findByUserAndRole(userID, RoleType.SYSTEM_MANAGER.value);
		if (listRoleIndividualGrant.isEmpty()) {
			return false;
		}
		//システム管理者リストを初期化する
		// Create new List System Admin
		List<CheckSysAdmin> listCheckSysAdmin = new ArrayList<CheckSysAdmin>();
		//パラメータ.有効期間From、パラメータ.有効期間Toをシステム管理者リストにセットする
		listCheckSysAdmin.add(new CheckSysAdmin(userID, validPeriod.start(), validPeriod.end()));
		//ドメインモデル「ロール個人別付与」を取得する
		List<RoleIndividualGrant> listSysAdmin = roleIndividualGrantRepo.findByRoleType(RoleType.SYSTEM_MANAGER.value);
		//取得したロール個人別付与をループする
		List<RoleIndividualGrant> filterListRoleIndividualGrant = listSysAdmin.stream().filter(c -> !c.getUserId().equals(userID) && c.getRoleType().equals(RoleType.SYSTEM_MANAGER)).collect(Collectors.toList());
		//ドメインモデル「ユーザ」を取得する
		List<String> userIds = filterListRoleIndividualGrant.stream().map(c -> c.getUserId()).collect(Collectors.toList());
		
		List<User> users = new ArrayList<User>();
		if (!userIds.isEmpty())
			users = userRepository.getByListUser(userIds);

		for (RoleIndividualGrant roleIndividualGrant : filterListRoleIndividualGrant) {
			User user = users.stream().filter(c -> c.getUserID().equals(roleIndividualGrant.getUserId())).findFirst().get();
			CheckSysAdmin checkSysAdmin = new CheckSysAdmin(userID, roleIndividualGrant.getValidPeriod().start(), roleIndividualGrant.getValidPeriod().end());

			if (roleIndividualGrant.getValidPeriod().end().after(user.getExpirationDate())) {
				checkSysAdmin.setEndDate(user.getExpirationDate());
			}
			listCheckSysAdmin.add(checkSysAdmin);
		}
		//取得されたシステム管理者リストを期間To（DESC）でソートする
		listCheckSysAdmin.sort((a, b) -> {
			return b.getEndDate().compareTo(a.getEndDate());
		});

		GeneralDate validStartDate = GeneralDate.max();
		GeneralDate validEndDate = GeneralDate.max();

		for (CheckSysAdmin checkSysAdmin : listCheckSysAdmin) {
			if (checkSysAdmin.getStartDate().before(validStartDate) && checkSysAdmin.getEndDate().afterOrEquals(validEndDate)) {
				validStartDate = checkSysAdmin.getStartDate();
			}
		}

		if (validStartDate.beforeOrEquals(GeneralDate.today()) && validEndDate.equals(GeneralDate.max())) {
			return true;
		}

		return false;

	}
	@Override
	public String getRoleFromUserId(String userId, int roleType, GeneralDate baseDate) {
		String companyId = AppContexts.user().companyId();
		if (roleType == RoleType.SYSTEM_MANAGER.value || roleType == RoleType.GROUP_COMAPNY_MANAGER.value)
			companyId = "000000000000-0000";
		
		Optional<RoleIndividualGrant> roleIndOpt = roleIndividualGrantRepo.findByUserCompanyRoleTypeDate(userId, companyId, roleType, baseDate);
		if(!roleIndOpt.isPresent()) {
			Optional<RoleSet> roleset = rolesetService.getRoleSetFromUserId(userId, baseDate);
			String roleID = roleset.isPresent() ? roleset.get().getRoleIDByRoleType(RoleType.valueOf(roleType)) : "";
			return roleID;
		}
		
		return roleIndOpt.get().getRoleId();
	}

	@Data
	@AllArgsConstructor
	protected class CheckSysAdmin {
		private String userID;
		private GeneralDate startDate;
		private GeneralDate endDate;
	}


	


	
}
