package command.person.emergencycontact;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregPersonId;

@Getter
public class PerEmergencyContactCommand {
	/** 緊急連絡先ID */
	@PeregPersonId
	private String emgencyContactId;

	/** 個人ID */
	@PeregPersonId
	private String pid;
	
	/** 個人名 */
	@PeregItem("")
	private String personName;
	
	/** 個人メールアドレス */
	@PeregItem("")
	private String personMailAddress;
	
	/** 住所  */
	@PeregItem("")
	private String streetAddressPerson;
	
	/** 個人携帯 */
	@PeregItem("")
	private String phone;
	
	/** 優先度 */
	@PeregItem("")
	private int priorityEmegencyContact;
	
	/** 関係 */
	@PeregItem("")
	private String relationShip;
}
