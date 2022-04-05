package nts.uk.ctx.bs.employee.pub.person;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

/**
 * The Class PersonInfoDto. Dto by Request List #01
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PersonInfoExport {

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
