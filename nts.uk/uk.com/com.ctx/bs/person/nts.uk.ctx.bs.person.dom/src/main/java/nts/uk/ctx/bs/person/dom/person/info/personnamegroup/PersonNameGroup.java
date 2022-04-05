package nts.uk.ctx.bs.person.dom.person.info.personnamegroup;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.bs.person.dom.person.info.fullnameset.FullNameSet;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PersonNameGroup {

	/** ビジネスネーム -BusinessName */
	private BusinessName businessName;
	
	/** ビジネスネームカナ  - BusinessName Kana */
	private BusinessNameKana businessNameKana;
	
	/** ビジネスネームその他  - BusinessOtherName*/
	private BusinessOtherName businessOtherName;
	
	/** ビジネスネーム英語  - BusinessEnglishName*/
	private BusinessEnglishName businessEnglishName;
	
	/** 個人名 - PersonName */
	private FullNameSet personName;
	
	/** 個人名多言語 - PersonalNameMultilingual*/
	private FullNameSet PersonalNameMultilingual;
	
	/** 個人名ローマ字  - PersonRomanji */
	private FullNameSet personRomanji;
	
	/** 個人届出名称  - TodokedeFullName */
	private FullNameSet todokedeFullName;
	
	/** 個人旧氏名 - OldName*/
	private FullNameSet oldName;
	
	


//	public PersonNameGroup(PersonName personName) {
//		super();
//		this.personName = personName;
//	}
	
	public PersonNameGroup(FullNameSet personName, BusinessName businessName) {
		super();
		this.personName = personName;
		this.businessName = businessName;
	}
	
	
	

}
