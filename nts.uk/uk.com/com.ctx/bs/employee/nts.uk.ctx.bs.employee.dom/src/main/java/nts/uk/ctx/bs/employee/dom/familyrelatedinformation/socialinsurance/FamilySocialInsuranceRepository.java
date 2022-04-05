package nts.uk.ctx.bs.employee.dom.familyrelatedinformation.socialinsurance;

import java.util.Optional;

public interface FamilySocialInsuranceRepository {
	public Optional<FamilySocialInsurance> getFamilySocialInsById(String familySocialInsById);
	/**
	 * 取得した「家族社会保険」を更新する
	 * @param domain
	 */
	void updateFamilySocialInsurance(FamilySocialInsurance domain);
	/**
	 * ドメインモデル「家族社会保険」を削除する
	 * @param domain
	 */
	void deleteFamilySocialInsurance(String familySocialInsuranceId);
}
