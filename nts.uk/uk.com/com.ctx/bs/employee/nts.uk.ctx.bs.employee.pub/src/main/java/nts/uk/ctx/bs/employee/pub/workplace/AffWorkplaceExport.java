package nts.uk.ctx.bs.employee.pub.workplace;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AffWorkplaceExport {

	// 社員ID
	private String employeeId;
	
	// 入社年月日
	private GeneralDate jobEntryDate;
	
	// 退職年月日
	private GeneralDate retirementDate;

}
