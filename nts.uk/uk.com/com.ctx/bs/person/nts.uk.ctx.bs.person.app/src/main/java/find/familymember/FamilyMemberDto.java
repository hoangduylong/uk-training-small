package find.familymember;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.person.dom.person.family.FamilyMember;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.find.dto.PeregDomainDto;

/**
 * @author xuan vinh
 *
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
// 家族
public class FamilyMemberDto extends PeregDomainDto{
	// 生年月日
	@PeregItem("")
	private GeneralDate birthday;
	
	// 死亡年月日
	@PeregItem("")
	private GeneralDate deadDay;
	
	// 入籍年月日
	@PeregItem("")
	private GeneralDate entryDate;
	
	// 除籍年月日
	@PeregItem("")
	private GeneralDate expelledDate;
	
	// 家族ID
	@PeregItem("")
	private String familyMemberId;
	
	// 氏名
	@PeregItem("")
	private String fullName;
	
	// 氏名カナ
	@PeregItem("")
	private String fullNameKana;
	
	// 氏名他言語
	@PeregItem("")
	private String nameMultiLangFull;
	
	// 氏名他言語カナ
	@PeregItem("")
	private String nameMultiLangFullKana;
	
	// 氏名ローマ字
	@PeregItem("")
	private String nameRomajiFull;
	
	// 氏名ローマ字カナ
	@PeregItem("")
	private String nameRomajiFullKana;
	
	// 国籍
	@PeregItem("")
	private String nationalityId;
	
	// 職業
	@PeregItem("")
	private String occupationName;
	
	// 個人ID
	@PeregItem("")
	private String personId;
	
	// 続柄
	@PeregItem("")
	private String relationship;
	
	// 支援介護区分
	@PeregItem("")
	private int supportCareType;

	@PeregItem("")
	private String tokodekeName;

	// 同居別居区分
	@PeregItem("")
	private int togSepDivisionType;
	
	// 勤労学生
	@PeregItem("")
	private int workStudentType;
	
	public static FamilyMemberDto createFromDomain(FamilyMember domain){
		return null;
//		return new FamilyMemberDto(domain.getBirthday(), domain.getDeadDay(), domain.getEntryDate(), domain.getExpelledDate(), domain.getFamilyMemberId(), 
//				domain.getFullName().v(), domain.getFullNameKana().v(), domain.getNameMultiLangFull().v(), 
//				domain.getNameMultiLangFullKana().v(), domain.getNameRomajiFull().v(), 
//				domain.getNameRomajiFullKana().v(), domain.getNationalityId().v(), domain.getOccupationName().v(),
//				domain.getPersonId(), domain.getRelationship().v(), domain.getSupportCareType().value, domain.getTokodekeName().v(),
//				domain.getTogSepDivisionType().value, domain.getWorkStudentType().value);
	}
}
