package nts.uk.ctx.bs.employee.pub.employee.export;

import lombok.Data;
import nts.arc.time.GeneralDate;

@Data
public class PerEmpBasicInfoDto {
	
	private String personId;
	
	private String employeeId;
	
	private String businessName;
	
	private int gender;
	
	private GeneralDate birthday;
	
	private String employeeCode;
	
	private GeneralDate jobEntryDate;
	
	private GeneralDate retirementDate;

}
