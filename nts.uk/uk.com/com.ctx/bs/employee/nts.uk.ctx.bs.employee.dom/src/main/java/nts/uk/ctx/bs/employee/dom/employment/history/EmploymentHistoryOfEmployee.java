package nts.uk.ctx.bs.employee.dom.employment.history;

import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

@NoArgsConstructor
@Data
public class EmploymentHistoryOfEmployee {
	
	private String sId;
	
	private GeneralDate startDate;
	
	private GeneralDate endDate;
	
	private String employmentCD;
	
	public EmploymentHistoryOfEmployee(String sID, GeneralDate startDate, GeneralDate endDate, String employmentCD){
		this.sId = sID;
		this.startDate = startDate;
		this.endDate = endDate;
		this.employmentCD = employmentCD;
	}
}
