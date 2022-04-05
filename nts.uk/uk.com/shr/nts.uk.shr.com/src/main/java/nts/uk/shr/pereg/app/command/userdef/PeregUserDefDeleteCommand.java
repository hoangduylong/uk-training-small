package nts.uk.shr.pereg.app.command.userdef;

import lombok.Value;
import nts.uk.shr.pereg.app.command.PeregDeleteCommand;

@Value
public class PeregUserDefDeleteCommand {

	private final String personId;
	
	private final String employeeId;

	/** category ID */
	private final String categoryId;
	
	/** Record Id, but this is null when new record */
	private final String recordId;
	
	public PeregUserDefDeleteCommand(PeregDeleteCommand command) {
		this.personId = command.getPersonId();
		this.employeeId = command.getEmployeeId();
		this.categoryId = command.getCategoryCode();
		this.recordId = command.getRecordId();
	}
}
