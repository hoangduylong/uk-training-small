package nts.uk.ctx.bs.employee.dom.familyrelatedinformation.care;

import java.util.Optional;

public interface FamilyCareRepository {
	public Optional<FamilyCare> getFamilyCareById(String familyCareId);
	/**
	 * 取得した「家族介護」を更新する
	 * @param domain
	 */
	void updateFamilyCare(FamilyCare domain);
	/**
	 * ドメインモデル「家族介護」を削除する
	 * @param domain
	 */
	void deleteFamilyCare(String familyCareId);
}
