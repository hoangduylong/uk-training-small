package nts.uk.shr.com.context.loginuser.role;

public interface LoginUserRoles {

	/**
	 * Returns role ID for attendance: 就業
	 * @return role ID
	 */
	String forAttendance();

	/**
	 * Returns role ID for payroll: 給与
	 * @return role ID
	 */
	String forPayroll();

	/**
	 * Returns role ID for personnel: 人事
	 * @return role ID
	 */
	String forPersonnel();

	/**
	 * Returns role ID for personal info: 個人情報
	 * @return role ID
	 */
	String forPersonalInfo();

	/**
	 * Returns role ID for office helper: オフィスヘルパー
	 * @return role ID
	 */
	String forOfficeHelper();

	/**
	 * Returns role ID for system admin: システム管理者
	 * @return role ID
	 */
	String forSystemAdmin();

	/**
	 * Returns role ID for company admin: 会社管理者
	 * @return role ID
	 */
	String forCompanyAdmin();
	
	/**
	 * REturns role ID for group companies admin: グループ会社管理者
	 * @return role ID
	 */
	String forGroupCompaniesAdmin();
	
	boolean isInChargeAttendance();
	
	boolean isInChargePayroll();
	
	boolean isInChargePersonnel();
	
	boolean isInChargePersonalInfo();
	
	default boolean isInChargeAny() {
		return isInChargeAttendance()
				|| isInChargePayroll()
				|| isInChargePersonnel()
				|| isInChargePersonalInfo();
	}
	
	
	/**
	 * Check if user has role for ...
	 * @return HavingRole
	 */
	default HavingRole have() {
		return new HavingRole(this);
	}
	
	public static class HavingRole {
		private final LoginUserRoles roles;
		
		public HavingRole(LoginUserRoles roles) {
			this.roles = roles;
		}
		
		/**
		 * Returns true if user have role for attendance: 就業
		 * @return result
		 */
		public boolean attendance() {
			return this.roles.forAttendance() != null;
		}

		/**
		 * Returns true if user have role for payroll: 給与
		 * @return result
		 */
		public boolean payroll() {
			return this.roles.forPayroll() != null;
		}

		/**
		 * Returns true if user have role for personnel: 人事
		 * @return result
		 */
		public boolean personnel() {
			return this.roles.forPersonnel() != null;
		}

		/**
		 * Returns true if user have role for office helper: オフィスヘルパー
		 * @return result
		 */
		public boolean officeHelper() {
			return this.roles.forOfficeHelper() != null;
		}

		/**
		 * Returns true if user have role for system admin: システム管理者
		 * @return result
		 */
		public boolean systemAdmin() {
			return this.roles.forSystemAdmin() != null;
		}

		/**
		 * Returns true if user have role for company admin: 会社管理者
		 * @return result
		 */
		public boolean companyAdmin() {
			return this.roles.forCompanyAdmin() != null;
		}
	}
}
