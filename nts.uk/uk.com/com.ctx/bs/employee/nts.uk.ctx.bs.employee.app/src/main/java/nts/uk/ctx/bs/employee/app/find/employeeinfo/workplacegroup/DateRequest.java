package nts.uk.ctx.bs.employee.app.find.employeeinfo.workplacegroup;

import lombok.Data;
import nts.arc.time.GeneralDate;

@Data
public class DateRequest {
private String baseDate;
	
	public GeneralDate toDate() {
		return GeneralDate.fromString(baseDate, "yyyy/MM/dd");
	}	

}
