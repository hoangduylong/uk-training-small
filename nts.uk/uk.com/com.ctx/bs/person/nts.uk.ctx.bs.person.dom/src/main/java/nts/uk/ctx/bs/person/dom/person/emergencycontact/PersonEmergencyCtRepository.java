package nts.uk.ctx.bs.person.dom.person.emergencycontact;

import java.util.List;

public interface PersonEmergencyCtRepository {
	
	PersonEmergencyContact getByid(String id);
	
	List<PersonEmergencyContact> getListbyPid(String pid);
	/**
	 * Add PersonEmergencyContact ドメインモデル「緊急連絡先」を新規登録する
	 * @param domain
	 */
	void addPersonEmergencyContact(PersonEmergencyContact domain);
	/**
	 * Update PersonEmergencyContact 取得した「緊急連絡先」を更新する
	 * @param domain
	 */
	void updatePersonEmergencyContact(PersonEmergencyContact domain);

}
