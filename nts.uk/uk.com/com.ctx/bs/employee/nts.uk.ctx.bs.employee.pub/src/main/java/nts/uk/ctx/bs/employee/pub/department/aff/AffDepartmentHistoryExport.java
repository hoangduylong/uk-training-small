package nts.uk.ctx.bs.employee.pub.department.aff;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;



@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AffDepartmentHistoryExport {

	public String companyId;
	
	public String employeeId;
	
	public String historyId;
	
	public String departmentId;

	public String affHistoryTranfsType;

	public Integer distributionRatio;
	
	public GeneralDate startDate;
	
	public GeneralDate endDate;
	
}
