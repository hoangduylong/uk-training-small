package nts.uk.ctx.bs.employee.pub.employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import nts.arc.time.GeneralDate;
/**
 * 
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
@Getter
@Builder
public class PersonInfoJhn001Export {
	private String pid;

	private String businessName;

	private GeneralDate entryDate;

	private int gender;

	private GeneralDate birthDay;

	/** The employee id. */
	private String employeeId;

	/** The employee code. */
	private String employeeCode;

	private GeneralDate retiredDate;
}
