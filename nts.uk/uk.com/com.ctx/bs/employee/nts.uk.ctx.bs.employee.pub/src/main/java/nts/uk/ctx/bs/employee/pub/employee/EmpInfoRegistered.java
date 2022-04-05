package nts.uk.ctx.bs.employee.pub.employee;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Result RequestList101.
 */
// 
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpInfoRegistered {

	/** The companyid. */
	private String cid;
	/** The Employee code. */
	private String employeeCode;
	/** The Employee ID. */
	private String sid;
	/** The personal name. */
	private String personName;
	/** The PersonID. */
	private String pid;
	
}
