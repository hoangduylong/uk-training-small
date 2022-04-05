package nts.uk.ctx.sys.auth.dom.wkpmanager.dom;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmpBasicInfoImport {
	/** The p id. */
	// 個人ID
	private String pId;
	
	private String namePerson;

	/** The emp id. */
	// 社員ID
	private String employeeId;

	/** The p name. */
	// 個人名
	private String pName;

	/** The gender. */
	// 性別
	private int gender;

	/** The birth day. */
	// 生年月日
	private GeneralDate birthDay;

	/** The p mail addr. */
	// 個人メールアドレス
	

	/** The emp code. */
	// 社員コード
	private String employeeCode;

	/** The entry date. */
	// 入社年月日
	private GeneralDate entryDate;

	/** The retired date. */
	// 退職年月日
	private GeneralDate retiredDate;

	/** The company mail addr. */
	// 会社メールアドレス
	
}
