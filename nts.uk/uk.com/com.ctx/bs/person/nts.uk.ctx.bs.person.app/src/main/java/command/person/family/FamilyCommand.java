package command.person.family;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregPersonId;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class FamilyCommand {
	/** 生年月日 */ 
	@PeregItem("IS00047")
	private GeneralDate birthday;
	
	/** 死亡年月日  */
	@PeregItem("IS00048")
	private GeneralDate deadDay;
	
	/** 入籍年月日  */
	@PeregItem("IS00049")
	private GeneralDate entryDate;
	
	/** 除籍年月日  */
	@PeregItem("IS00050")
	private GeneralDate expelledDate;
	
	/** 家族ID  */
	@PeregRecordId
	private String familyId;
	
	/** 氏名  */
	@PeregItem("IS00040")
	private String fullName;
	
	/** 氏名カナ  */
	@PeregItem("IS00041")
	private String fullNameKana;
	
	/** 氏名他言語  */
	@PeregItem("IS00044")
	private String nameMultiLangFull;
	
	/** 氏名他言語カナ  */
	@PeregItem("IS00045")
	private String nameMultiLangFullKana;
	
	/** 氏名ローマ字  */
	@PeregItem("IS00042")
	private String nameRomajiFull;
	
	/** 氏名ローマ字カナ  */
	@PeregItem("IS00043")
	private String nameRomajiFullKana;
	
	/** 国籍  */
	@PeregItem("IS00051")
	private String nationalityId;
	
	/** 職業  */
	@PeregItem("IS00052")
	private String occupationName;
	
	/** 個人ID  */
	@PeregPersonId
	private String personId;
	
	/** 続柄  */
	@PeregItem("IS00053")
	private String relationship;
	
	/** 支援介護区分  */
	@PeregItem("IS00055")
	private int supportCareType;

	@PeregItem("IS00046")
	private String tokodekeName;

	/** 同居別居区分  */
	@PeregItem("IS00054")
	private int togSepDivisionType;
	
	/** 勤労学生  */
	@PeregItem("IS00056")
	private int workStudentType;
}
