package find.person.info;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.person.dom.person.info.Person;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.find.dto.PeregDomainDto;

@Getter
@Setter
@AllArgsConstructor
public class PersonDto extends PeregDomainDto{
	/** The Birthday */
	// 生年月日
	@PeregItem("IS00017")
	private GeneralDate birthDate;

	/** The BloodType */
	// 血液型
	@PeregItem("IS00019")
	private Integer bloodType;

	/** The Gender - 性別 */
	@PeregItem("IS00018")
	private int gender;

	/** The PersonNameGroup - 個人名グループ*/
	@PeregItem("IS00003")
	private String personName;

	@PeregItem("IS00004")
	private String personNameKana;

	@PeregItem("IS00009")
	private String businessName;
	
	@PeregItem("IS00010")
	private String businessNameKana;

	@PeregItem("IS00011")
	private String businessEnglishName;

	@PeregItem("IS00012")
	private String businessOtherName;

	@PeregItem("IS00005")
	private String personRomanji;
	
	@PeregItem("IS00006")
	private String personRomanjiKana;

	@PeregItem("IS00013")
	private String oldName;
	
	@PeregItem("IS00014")
	private String oldNameKana;

	@PeregItem("IS00015")
	private String todokedeFullName;
	
	@PeregItem("IS00016")
	private String todokedeFullNameKana;

	@PeregItem("IS00007")
	private String PersonalNameMultilingual;
	
	@PeregItem("IS00008")
	private String PersonalNameMultilingualKana;
	
	public static PersonDto createFromDomain(Person person){
		boolean hasBusinessNameKana = checkExist(person.getPersonNameGroup().getBusinessNameKana());
		boolean hasBusinessOtherName = checkExist(person.getPersonNameGroup().getBusinessOtherName());
		boolean hasBusinessEnglishName = checkExist(person.getPersonNameGroup().getBusinessEnglishName());
		boolean hasPerRomanjiFullName = checkExist(person.getPersonNameGroup().getPersonRomanji(), 
				person.getPersonNameGroup().getPersonRomanji() == null ? null : person.getPersonNameGroup().getPersonRomanji().getFullName());
		boolean hasPerRomanjiFullNameKana = checkExist(person.getPersonNameGroup().getPersonRomanji(), 
				person.getPersonNameGroup().getPersonRomanji() == null ? null : person.getPersonNameGroup().getPersonRomanji().getFullNameKana());
		boolean hasTodokedeFullName = checkExist(person.getPersonNameGroup().getTodokedeFullName(), 
				person.getPersonNameGroup().getTodokedeFullName() == null ? null :person.getPersonNameGroup().getTodokedeFullName().getFullName());
		boolean hasTodokedeFullNameFullName = checkExist(person.getPersonNameGroup().getTodokedeFullName(), 
				person.getPersonNameGroup().getTodokedeFullName() == null ? null : person.getPersonNameGroup().getTodokedeFullName().getFullNameKana());
		boolean hasOldNameFullName = checkExist(person.getPersonNameGroup().getOldName(), 
				person.getPersonNameGroup().getOldName() == null ? null : person.getPersonNameGroup().getOldName().getFullName());
		boolean hasOldNameFullNameKana = checkExist(person.getPersonNameGroup().getOldName(), 
				person.getPersonNameGroup().getOldName() == null ? null : person.getPersonNameGroup().getOldName().getFullNameKana());
		boolean hasPerNameMultilLang = checkExist(person.getPersonNameGroup().getPersonalNameMultilingual(), 
				person.getPersonNameGroup().getPersonalNameMultilingual() == null ? null : person.getPersonNameGroup().getPersonalNameMultilingual().getFullName()) ;
		boolean hasPerNameMultilLangKana = checkExist(person.getPersonNameGroup().getPersonalNameMultilingual(), 
				person.getPersonNameGroup().getPersonalNameMultilingual() == null ? null : person.getPersonNameGroup().getPersonalNameMultilingual().getFullNameKana());

		PersonDto personDto =  new PersonDto(person.getBirthDate(), 
				person.getBloodType() != null ? person.getBloodType().value : null, 
				person.getGender().value, 
				person.getPersonNameGroup().getPersonName().getFullName().v().trim(),
				person.getPersonNameGroup().getPersonName().getFullNameKana().v().trim(), 
				person.getPersonNameGroup().getBusinessName().v().trim(), 
				hasBusinessNameKana ? person.getPersonNameGroup().getBusinessNameKana().v().trim() : "", 
				hasBusinessEnglishName ? person.getPersonNameGroup().getBusinessEnglishName().v().trim() : "", 
				hasBusinessOtherName ? person.getPersonNameGroup().getBusinessOtherName().v().trim() : "", 
				hasPerRomanjiFullName ? person.getPersonNameGroup().getPersonRomanji().getFullName().v().trim() : "", 
				hasPerRomanjiFullNameKana ? person.getPersonNameGroup().getPersonRomanji().getFullNameKana().v().trim() : "", 
				hasOldNameFullName ? person.getPersonNameGroup().getOldName().getFullName().v().trim() : "", 
				hasOldNameFullNameKana ? person.getPersonNameGroup().getOldName().getFullNameKana().v().trim() : "", 
				hasTodokedeFullName ? person.getPersonNameGroup().getTodokedeFullName().getFullName().v().trim() : "", 
				hasTodokedeFullNameFullName ? person.getPersonNameGroup().getTodokedeFullName().getFullNameKana().v().trim() : "", 
				hasPerNameMultilLang ? person.getPersonNameGroup().getPersonalNameMultilingual().getFullName().v().trim() : "", 
				hasPerNameMultilLangKana ? person.getPersonNameGroup().getPersonalNameMultilingual().getFullNameKana().v().trim() : "");
		personDto.setRecordId(person.getPersonId());
		return personDto;
	}
	
	public static PersonDto createFromDomain(Object[] person){
		PersonDto personDto =  new PersonDto(person[1] == null? null: (GeneralDate) person[1], 
				person[2] != null ? (Integer) person[2] : null, 
				person[3] != null? (Integer) person[3] : null, 
				person[4] != null?  person[4].toString().trim() : "",
				person[5] != null?  person[5].toString().trim() : "", 
				person[6] != null?  person[6].toString().trim() : "", 
				person[7] != null?  person[7].toString().trim() : "",
				person[8] != null?  person[8].toString().trim() : "", 
				person[9] != null?  person[9].toString().trim() : "", 
				person[10] != null?  person[10].toString().trim() : "", 
				person[11] != null?  person[11].toString().trim() : "", 
				person[14] != null?  person[14].toString().trim() : "", 
				person[15] != null?  person[15].toString().trim() : "", 
				person[12] != null?  person[12].toString().trim() : "", 
				person[13] != null?  person[13].toString().trim() : "", 
				person[16] != null?  person[12].toString().trim() : "", 
				person[17] != null?  person[13].toString().trim() : "");
		personDto.setRecordId(person[0].toString());
		return personDto;
	}
	
	private static boolean checkExist(Object parent, Object obj){
		return parent != null ? (obj != null ? true : false) : false;
	}
	
	private static boolean checkExist(Object obj){
		return obj != null;
	}
	
}
