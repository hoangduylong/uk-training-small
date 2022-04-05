package nts.uk.ctx.bs.employee.dom.department;

public interface CurrentAffiDeptRepository {
	public CurrentAffiDept getCurrentAffiDeptById(String currentAffiDeptById);
	
	/**
	 * ドメインモデル「所属部門（兼務）」を新規登録する
	 * @param domain
	 */
	void addCurrentAffiDept(CurrentAffiDept domain);
	/**
	 * 取得した「所属部門（兼務）」を更新する
	 * @param domain
	 */
	void updateCurrentAffiDept(CurrentAffiDept domain);
	
	/**
	 * ドメインモデル「所属部門（兼務）」を削除する
	 * @param currrentAffiDeptId
	 */
	void deleteCurrentAffiDept(String currrentAffiDeptId);
}
