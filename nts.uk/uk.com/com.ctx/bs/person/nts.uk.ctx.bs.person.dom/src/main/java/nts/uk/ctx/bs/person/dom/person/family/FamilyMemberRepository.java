package nts.uk.ctx.bs.person.dom.person.family;

import java.util.List;

public interface FamilyMemberRepository {

	FamilyMember getFamilyById(String familyId);

	/**
	 * Add family ドメインモデル「家族」を新規登録する
	 * @param family
	 */
	void addFamily(FamilyMember family);
	/**
	 * Update family 取得した「家族」を更新する
	 * @param family
	 */
	void updateFamily(FamilyMember family);

	/**
	 * ドメインモデル「家族」を取得する
	 * @param pid 個人ID
	 * @param relationShipCodes 家族続柄コード
	 * @return family
	 */
	List<FamilyMember> getListByPidAndRelationCode(String pid, List<String> relationShipCodes);

	/**
	 * ドメインモデル「家族」を取得する
	 * @param pid 個人ID
	 * @return family
	 */
	List<FamilyMember> getListByPid(String pid);
}
