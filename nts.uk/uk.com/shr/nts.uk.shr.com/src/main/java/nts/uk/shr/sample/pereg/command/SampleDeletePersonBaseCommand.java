package nts.uk.shr.sample.pereg.command;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregPersonId;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class SampleDeletePersonBaseCommand {

	@PeregPersonId
	private String personId;
	
	@PeregEmployeeId
	private String employeeId;
	
	@PeregRecordId
	private String recordId;
}
