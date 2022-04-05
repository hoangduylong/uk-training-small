package nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.arc.time.calendar.period.DatePeriod;

@Data
@AllArgsConstructor
public class EmpWorkplaceHistoryImport {
	/** 社員ID */	
	private String employeeID;
	/** 職場ID */
	private String workplaceID;
	/** 職場コード */
	private String workplaceCD;
	
	private String workplaceName;
	/** 職場表示名 */
	private String wkpDisplayName;
	/** 配属期間 */
	private DatePeriod dateRange;
}
