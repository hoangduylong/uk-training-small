package nts.uk.ctx.sys.auth.dom.role.authorize;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.val;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.grant.roleindividual.RoleIndividualGrant;
import nts.uk.ctx.sys.auth.dom.role.RoleType;
import nts.uk.ctx.sys.auth.dom.roleset.RoleSet;
import nts.uk.shr.com.context.loginuser.LoginUserContextManager.RoleIdSetter;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

/**
 * ユーザに付与する権限ロールの認可処理
 */
public class AuthorizeUserRoles {

	/**
	 * 認可されたロールをRoleIdSetterにセットする
	 * @param require
	 * @param roleIdSetter
	 * @param userId
	 */
	public static void authorize(Require require, RoleIdSetter roleIdSetter, String userId) {
		buildUserRolesInternal(require, userId).setInto(roleIdSetter);
	}
	
	/**
	 * 認可されたロールをLoginUserRolesの形で返す
	 * @param require
	 * @param userId
	 * @return
	 */
	public static LoginUserRoles buildUserRoles(Require require, String userId) {
		return buildUserRolesInternal(require, userId);
	}
	
	private static UserRoles buildUserRolesInternal(Require require, String userId) {
		
		val today = GeneralDate.today();
		val rolesInCharge = require.getRoleIndividualGrants(userId, today);
		val roleSet = require.getRoleSet(userId, today);
		
		return new UserRoles(rolesInCharge, roleSet);
	}
	
	public static interface Require {
		List<RoleIndividualGrant> getRoleIndividualGrants(String userId, GeneralDate date);
		Optional<RoleSet> getRoleSet(String userId, GeneralDate date);
	}
	
	@RequiredArgsConstructor
	private static class UserRoles implements LoginUserRoles {
		
		private final List<RoleIndividualGrant> rolesInCharge;
		private final Optional<RoleSet> roleSet;

		public void setInto(RoleIdSetter setter) {

			setter.forAttendance(forAttendance());
			setter.forPayroll(forPayroll());
			setter.forPersonnel(forPersonnel());
			setter.forPersonalInfo(forPersonalInfo());
			setter.forOfficeHelper(forOfficeHelper());
			setter.forSystemAdmin(forSystemAdmin());
			setter.forCompanyAdmin(forCompanyAdmin());
			setter.forGroupCompaniesAdmin(forGroupCompaniesAdmin());

			setter.isInChargeAttendance(isInChargeAttendance());
			setter.isInChargePayroll(isInChargePayroll());
			setter.isInChargePersonnel(isInChargePersonnel());
			setter.isInChargePersonalInfo(isInChargePersonalInfo());
		}
		
		private String getRoleId(RoleType roleType) {
			return getRoleInCharge(roleType)
					.map(r -> r.getRoleId())
					.orElseGet(() -> getGeneralRole(roleType));
		}
		
		private boolean isInCharge(RoleType roleType) {
			return getRoleInCharge(roleType).isPresent();
		}
		
		private Optional<RoleIndividualGrant> getRoleInCharge(RoleType roleType) {
			return rolesInCharge.stream()
					.filter(r -> r.getRoleType().equals(roleType))
					.findFirst();
		}
		
		private String getGeneralRole(RoleType roleType) {
			return roleSet
					.map(s -> s.getRoleIDByRoleType(roleType))
					.filter(id -> !id.equals(""))
					.orElse(null);
		}
		
		@Override
		public String forAttendance() {
			return getRoleId(RoleType.EMPLOYMENT);
		}

		@Override
		public String forPayroll() {
			return getRoleId(RoleType.SALARY);
		}

		@Override
		public String forPersonnel() {
			return getRoleId(RoleType.HUMAN_RESOURCE);
		}

		@Override
		public String forPersonalInfo() {
			return getRoleId(RoleType.PERSONAL_INFO);
		}

		@Override
		public String forOfficeHelper() {
			return getRoleId(RoleType.OFFICE_HELPER);
		}

		@Override
		public String forSystemAdmin() {
			return getRoleId(RoleType.SYSTEM_MANAGER);
		}

		@Override
		public String forCompanyAdmin() {
			return getRoleId(RoleType.COMPANY_MANAGER);
		}

		@Override
		public String forGroupCompaniesAdmin() {
			return getRoleId(RoleType.GROUP_COMAPNY_MANAGER);
		}

		@Override
		public boolean isInChargeAttendance() {
			return isInCharge(RoleType.EMPLOYMENT);
		}

		@Override
		public boolean isInChargePayroll() {
			return isInCharge(RoleType.SALARY);
		}

		@Override
		public boolean isInChargePersonnel() {
			return isInCharge(RoleType.HUMAN_RESOURCE);
		}

		@Override
		public boolean isInChargePersonalInfo() {
			return isInCharge(RoleType.PERSONAL_INFO);
		}
		
	}
}
