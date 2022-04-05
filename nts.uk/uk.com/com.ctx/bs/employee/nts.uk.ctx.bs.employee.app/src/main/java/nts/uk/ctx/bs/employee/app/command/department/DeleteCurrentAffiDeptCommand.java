package nts.uk.ctx.bs.employee.app.command.department;


import lombok.Getter;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class DeleteCurrentAffiDeptCommand {
	/**社員ID EmployeeId*/
	@PeregEmployeeId
	private String employeeId;
	
	/**所属部門ID AffiliationDepartmentID*/
	@PeregRecordId
	private String affiDeptId;
}
