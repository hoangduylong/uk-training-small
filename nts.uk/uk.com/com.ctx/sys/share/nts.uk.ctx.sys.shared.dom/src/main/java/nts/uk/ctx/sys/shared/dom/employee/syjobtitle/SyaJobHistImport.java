package nts.uk.ctx.sys.shared.dom.employee.syjobtitle;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.arc.time.calendar.period.DatePeriod;

@Data
@AllArgsConstructor
public class SyaJobHistImport {

	/** The employee id. */
	// 社員ID
	private String employeeId;

	/** The job title id. */
	// 職位ID
	private String jobTitleId;

	/** The job title name. */
	// 職位名称
	private String jobTitleName;

	/** The period */
	// 所属期間
	private DatePeriod period;
}
