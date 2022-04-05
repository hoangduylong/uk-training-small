package nts.uk.shr.sample.pereg.command;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregPersonId;

@Getter
public class SampleAddPersonBaseCommand {

	@PeregPersonId
	private String personId;
	
	@PeregEmployeeId
	private String employeeId;
	
	@PeregItem("IS00001")
	private String fullName;
	
	@PeregItem("IS00002")
	private String fullNameKana;

}
