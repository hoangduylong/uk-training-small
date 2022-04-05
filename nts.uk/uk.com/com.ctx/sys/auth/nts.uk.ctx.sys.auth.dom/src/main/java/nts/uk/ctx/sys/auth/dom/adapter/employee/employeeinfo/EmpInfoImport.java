package nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class EmpInfoImport {

	/** The company id. */
	private String companyId;

	/** The employee code. */
	private String employeeCode;

	/** The employee id. */
	private String employeeId;

	/** The person Id. */
	private String personId ;

	private String perName ;
}
