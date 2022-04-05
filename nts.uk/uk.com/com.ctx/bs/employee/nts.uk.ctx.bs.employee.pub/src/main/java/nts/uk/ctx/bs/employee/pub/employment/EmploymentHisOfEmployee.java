package nts.uk.ctx.bs.employee.pub.employment;

import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

@NoArgsConstructor
@Data
public class EmploymentHisOfEmployee {
	
	private String sId;
	
	private GeneralDate startDate;
	
	private GeneralDate endDate;
	
	private String employmentCD;
	
	public EmploymentHisOfEmployee(String sID, GeneralDate startDate, GeneralDate endDate, String employmentCD){
		this.sId = sID;
		this.startDate = startDate;
		this.endDate = endDate;
		this.employmentCD = employmentCD;
	}
}
