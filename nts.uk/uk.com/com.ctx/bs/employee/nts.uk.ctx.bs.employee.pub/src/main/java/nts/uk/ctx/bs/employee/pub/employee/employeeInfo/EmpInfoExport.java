package nts.uk.ctx.bs.employee.pub.employee.employeeInfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Dto for requestList No.124
 *
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmpInfoExport {

	/** The company id. 会社ID */
	private String companyId;
	
	/** The employee id. 社員ID */
	private String employeeId;

	/** The person id. 個人ID */
	private String pId;

	/** The EmployeeCode. 社員コード */
	private String employeeCode;

	/** The person name. 個人名 */
	private String personName;

}
