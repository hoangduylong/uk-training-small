package nts.uk.ctx.bs.person.pub.contact;

import java.util.List;

public interface PersonContactPub {
	
	/**
	 * 個人ID（List）から個人連絡先を取得
	 * RequestList 379
	 * @param personIds
	 * @return
	 */
	List<PersonContactObject> getList(List<String> personIds);
	
	/**
	 * 個人連絡先を登録する
	 * RequestList 381
	 * @param personId
	 * @param cellPhoneNumber
	 * @param mailAdress
	 * @param mobileMailAdress
	 */
	void register(String personId, String cellPhoneNumber, String mailAdress, String mobileMailAdress);
	
	/**
	 * 取得する
	 * @param personId
	 * @return the person contact object
	 */
	PersonContactObject getPersonalContact(String personId);
	
}
