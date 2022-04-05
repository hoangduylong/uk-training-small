package nts.uk.ctx.bs.person.dom.person.perdeletionmanagement;

import nts.uk.ctx.bs.person.dom.person.deletemanagement.PersonDeleteManagement;

public interface IperDeletionManagementRepository {
	/**
	 * ドメインモデル「個人情報削除管理」を新規登録する
	 * @param perDeletion
	 */
	void addPerDeletionManagemanagement(PersonDeleteManagement perDeletion);
}
