package nts.uk.ctx.bs.employee.app.command.department;


import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class CurrentAffiDeptCommand {
	/**社員ID EmployeeId*/
	@PeregEmployeeId
	private String employeeId;
	
	/**所属部門ID AffiliationDepartmentID*/
	@PeregRecordId
	private String affiDeptId;
	
	/**部門ID Department id*/
	@PeregItem("")
	private String departmentId;
	
	/** The DateHistoryItem. */
	private String historyId;
	
	@PeregItem("")
	private GeneralDate startDate;
	
	@PeregItem("")
	private GeneralDate endDate;
}
