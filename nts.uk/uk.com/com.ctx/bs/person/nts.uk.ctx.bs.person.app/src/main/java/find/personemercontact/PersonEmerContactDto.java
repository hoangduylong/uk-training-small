/**
 * 
 */
package find.personemercontact;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.bs.person.dom.person.emergencycontact.PersonEmergencyContact;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.find.dto.PeregDomainDto;

/**
 * 緊急連絡先
 * @author danpv
 *
 */

@Getter
@Setter
@AllArgsConstructor
public class PersonEmerContactDto extends PeregDomainDto{
	/** 緊急連絡先ID */
	@PeregItem("")
	private String emgencyContactId;

	/** 個人ID */
	@PeregItem("")
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

	public PersonEmerContactDto createFromDomain(PersonEmergencyContact domain){
		return new PersonEmerContactDto(domain.getEmgencyContactId(), domain.getPid(), domain.getPersonName().v(),
				domain.getPersonMailAddress().v(), domain.getStreetAddressPerson().v(), domain.getPhone().v(), 
				domain.getPriorityEmegencyContact().v().intValue(), domain.getRelationShip().v());
	}
}
