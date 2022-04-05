package nts.uk.ctx.bs.employee.pub.employmentstatus;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmploymentInfo {
	
	private GeneralDate standardDate;
	
	private EmploymentState employmentState;
	
	private Optional<Integer> tempAbsenceFrNo;

}
