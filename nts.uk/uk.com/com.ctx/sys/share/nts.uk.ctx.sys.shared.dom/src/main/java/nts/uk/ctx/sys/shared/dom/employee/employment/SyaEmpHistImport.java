package nts.uk.ctx.sys.shared.dom.employee.employment;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.arc.time.calendar.period.DatePeriod;

@Data
@AllArgsConstructor
public class SyaEmpHistImport {

	/** The employee id. */
	// 社員ID
	private String employeeId;

	/** The job title code. */
	// 雇用コード
	private String employmentCode;

	/** The job title name. */
	// 雇用名称
	private String employmentName;

	/** The period. */
	// 所属期間 
	private DatePeriod period;
}
