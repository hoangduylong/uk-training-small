/**
 *
 */
package nts.uk.ctx.bs.person.dom.person.family;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.person.dom.person.family.fullnameset.FullNameSet;
import nts.uk.ctx.bs.person.dom.person.family.relationship.RelationShipCode;

/**
 * 家族
 * @author danpv
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FamilyMember extends AggregateRoot {

	// 家族ID
	private String familyMemberId;

	// 個人ID
    private String personId;

	// 氏名
	private FullNameSet fullName;

	//氏名ローマ字
	private Optional<FullNameSet> fullNameRomaji;

	// 氏名他言語
	private Optional<FullNameSet> fullNameMultiLang;

	// 届出氏名
	private Optional<FullNameSet> fullNametokodeke;

	// 生年月日
	private GeneralDate birthday;

	// 死亡年月日
	private  Optional<GeneralDate> deadDay;

	// 入籍年月日
	private  Optional<GeneralDate> entryDate;

	// 除籍年月日
	private  Optional<GeneralDate> expelledDate;

	// 続柄
	private RelationShipCode relationshipCode;


	public static FamilyMember createFromJavaType(String familyId, String personId,
			String fullName, String fullNameKana,
			String nameRomajiFull, String nameRomajiFullKana,
			String nameMultiLangFull, String nameMultiLangFullKana,
			String tokodekeName, String tokodekeNameKana,
			GeneralDate birthday,
			GeneralDate deadDay,
			GeneralDate entryDate,
			GeneralDate expelledDate,
			String relationshipCode) {
		return new FamilyMember(familyId, personId,
				new FullNameSet(fullName, fullNameKana),
				Optional.of(new FullNameSet(nameRomajiFull, nameRomajiFullKana)),
				Optional.of(new FullNameSet(nameMultiLangFull, nameMultiLangFullKana)),
				Optional.of(new FullNameSet(tokodekeName, tokodekeNameKana)),
				birthday,
				Optional.ofNullable(deadDay),
				Optional.ofNullable(entryDate),
				Optional.ofNullable(expelledDate),
				new RelationShipCode(relationshipCode));

	}
}
