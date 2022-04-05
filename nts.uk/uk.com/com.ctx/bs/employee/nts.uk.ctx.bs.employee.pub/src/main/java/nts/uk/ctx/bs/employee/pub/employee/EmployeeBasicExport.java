package nts.uk.ctx.bs.employee.pub.employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeBasicExport {
	
	/** The emp id. */
	// 社員ID
	private String employeeId;
	
	/** The employeeCode. */
	// 社員コード
	private String employeeCode;
	
	
	/** The BusinessName. */
	// ビジネスネーム
	private String BusinessName;

}
