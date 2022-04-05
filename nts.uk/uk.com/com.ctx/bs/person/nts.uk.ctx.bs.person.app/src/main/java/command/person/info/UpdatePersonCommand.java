package command.person.info;


import java.math.BigDecimal;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregPersonId;

@Getter
public class UpdatePersonCommand{
	/** The Birthday */
	// 生年月日
	@PeregItem("IS00017")
	private GeneralDate birthDate;

	/** The BloodType */
	// 血液型
	@PeregItem("IS00019")
	private BigDecimal bloodType;

	/** The Gender - 性別 */
	@PeregItem("IS00018")
	private BigDecimal gender;

	/** The person id - 個人ID */
	@PeregPersonId
	private String personId;

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
	
}
