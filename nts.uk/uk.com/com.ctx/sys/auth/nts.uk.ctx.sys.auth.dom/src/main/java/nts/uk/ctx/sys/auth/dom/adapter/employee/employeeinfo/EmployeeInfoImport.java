package nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployeeInfoImport {
	
	/** The company id. */
	private String companyId;

	/** The employee code. */
	private String employeeCode;

	/** The employee id. */
	private String employeeId;

	/** The employee name */
	private String employeeName;
	
	/** The person Id. */
	private String personId;

}
