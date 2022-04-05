package nts.uk.ctx.bs.employee.pub.spr.export;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
@Getter
public class EmpSprExport {
	/** The company id. */
	private String companyID;

	/** The employee code. */
	private String employeeCD;

	/** The employee id. */
	private String employeeID;

	/** The person Id. */
	private String personID;
	
	private String perName;
}
