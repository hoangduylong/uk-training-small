package nts.uk.ctx.bs.employee.pub.employment.statusemployee;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

/**
 * 
 * dto for requestList No.75
 * class Status Of Employment
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatusOfEmploymentExport {
	
	/** The employee id. */
	// 社員ID
	private String employeeId;
	
	private GeneralDate refereneDate;
	
	private int statusOfEmployment;
	
	private int tempAbsenceFrNo;
}
