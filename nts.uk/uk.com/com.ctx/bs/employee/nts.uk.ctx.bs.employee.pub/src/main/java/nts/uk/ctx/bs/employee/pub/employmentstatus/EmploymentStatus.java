package nts.uk.ctx.bs.employee.pub.employmentstatus;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmploymentStatus {
	
	private String employeeId;
	
	private List<EmploymentInfo> employmentInfo;

}
