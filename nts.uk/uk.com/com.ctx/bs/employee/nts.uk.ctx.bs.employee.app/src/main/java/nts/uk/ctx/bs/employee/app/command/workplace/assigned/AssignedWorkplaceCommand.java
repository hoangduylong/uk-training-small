package nts.uk.ctx.bs.employee.app.command.workplace.assigned;


import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class AssignedWorkplaceCommand {
	
	/**Employee id*/
	@PeregEmployeeId
	private String employeeId;
	
	@PeregRecordId
	private String assignedWorkplaceId;
	
	@PeregItem("")
	private String workplaceId;
	
	private String historyId;
	
	@PeregItem("")
	private GeneralDate startDate;
	
	@PeregItem("")
	private GeneralDate endDate;
}
