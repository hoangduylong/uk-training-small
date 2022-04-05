package nts.uk.ctx.bs.employee.pub.employee.employeeInfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

/**
 * Dto for requestList No.126
 *
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmpBasicInfoExport {

	/** The employee id. 社員ID */
	private String employeeId;

	/** The person id. 個人ID */
	private String pId;

	/** The EmployeeCode. 社員コード */
	private String employeeCode;

	/** The person name. 個人名 */
	private String personName;

	/** The PersonMailAddress 個人メールアドレス. */
	private String personMailAddress;

	/** The companyMailAddress 会社メールアドレス */
	private String companyMailAddress;

	/** The entryDate 入社年月日 */
	private GeneralDate entryDate;

	/** The birthDay 生年月日 */
	private GeneralDate birthDay;

	/** The retiredDate 退職年月日 */
	private GeneralDate retiredDate;

	/** The gender 性別 */
	private int gender;

}
