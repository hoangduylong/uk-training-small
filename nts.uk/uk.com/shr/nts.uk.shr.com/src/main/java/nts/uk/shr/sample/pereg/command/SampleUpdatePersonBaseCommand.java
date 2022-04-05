package nts.uk.shr.sample.pereg.command;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregPersonId;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class SampleUpdatePersonBaseCommand {

	@PeregPersonId
	private String personId;
	
	@PeregEmployeeId
	private String employeeId;
	
	@PeregRecordId
	private String currentAddressId;
	
	@PeregItem("IS00001")
	private String fullName;
	
	@PeregItem("IS00002")
	private String fullNameKana;

}
