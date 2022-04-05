package nts.uk.ctx.bs.employee.dom.familyrelatedinformation.incometax;

import java.util.Optional;

public interface IncomeTaxRepository {
	public Optional<IncomeTax> getIncomeTaxById(String incomeTaxID);
	/**
	 * 取得した「家族所得税」を更新する
	 * @param domain
	 */
	void updateIncomeTax(IncomeTax domain);
	/**
	 * ドメインモデル「家族所属税」を削除する
	 * @param domain
	 */
	void deleteIncomeTax(String incomeTaxId);
}
