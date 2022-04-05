package nts.uk.ctx.bs.employee.pub.company;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.arc.time.calendar.period.DatePeriod;

@Data
@AllArgsConstructor
public class SyaCompanyHistExport {

	/** The employee id. */
	// 社員ID
	private String employeeId;

	/** The job title id. */
	// 会社ID
	private String companyId;

	/** The period */
	// 所属期間
	private DatePeriod period;
}
