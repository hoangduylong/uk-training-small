package nts.uk.ctx.sys.auth.dom.adapter.person;

import lombok.Builder;
import lombok.Data;
import nts.arc.time.GeneralDate;

@Data
@Builder
public class EmployeeBasicInforAuthImport {
	/** 個人ID */
	private String pid;
	/** ビジネスネーム */
	private String businessName;
	/** 入社年月日 */ 
	private GeneralDate entryDate;
	/** 性別 */
	private int gender;
	/** 生年月日 */
	private GeneralDate birthDay;
	/** 社員ID */
	private String employeeId;
	/** 社員コード */
	private String employeeCode;
	/** 退職年月日 */
	private GeneralDate retiredDate;
	public EmployeeBasicInforAuthImport(String pid, String businessName, GeneralDate entryDate, int gender, GeneralDate birthDay, String employeeId, String employeeCode, GeneralDate retiredDate) {
		super();
		this.pid = pid;
		this.businessName = businessName;
		this.entryDate = entryDate;
		this.gender = gender;
		this.birthDay = birthDay;
		this.employeeId = employeeId;
		this.employeeCode = employeeCode;
		this.retiredDate = retiredDate;
	}
	

}
