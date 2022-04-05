/**
 * 
 */
package nts.uk.ctx.bs.employee.pub.employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * dto by RequestList 228
 *
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmployeeInfoExport {
	
	/** 社員ID */
	private String sid;

	/** 社員コード.Employee code */
	private String scd;

	/** ビジネスネーム.Business name */
	private String bussinessName;

}
