package nts.uk.ctx.bs.employee.pub.workplace;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkPlaceHistExport {
	
	/** The employee id. */
	// 社員ID
	private String employeeId;
	
	private List<WorkPlaceIdAndPeriod> lstWkpIdAndPeriod;

}
