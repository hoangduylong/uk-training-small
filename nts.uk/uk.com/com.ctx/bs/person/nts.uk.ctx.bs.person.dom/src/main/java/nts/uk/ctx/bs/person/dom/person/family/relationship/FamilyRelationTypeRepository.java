package nts.uk.ctx.bs.person.dom.person.family.relationship;

import java.util.List;

public interface FamilyRelationTypeRepository {
	
	/**
	 * ドメインモデル「家族続柄種類」を取得する
	 * 【条件】
	 * 契約コード　＝　ログインしている契約コード
     * 配偶者区分　＝　true
	 * @param contractCd
	 * @return
	 */
	public List<FamilyRelationType> getFamilyRelationTypeIsSpouse(String contractCd);
}
