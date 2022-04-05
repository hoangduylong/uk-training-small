package nts.uk.ctx.bs.person.pub.family;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FamilyExport623 {
	private String familyId;
	private String birthday;
	// 家族.氏名.氏名
	private String fullName;
	//家族.氏名.氏名カナ
	private String fullNameKana;
	//家族.氏名ローマ字.氏名
	private Optional<String> romajiName;
	//家族.氏名ローマ字.氏名カナ
	private Optional<String> romajiNameKana;
}
