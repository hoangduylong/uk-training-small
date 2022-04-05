package nts.uk.ctx.bs.employee.pub.employment;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * dto by requestList 264
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmploymentHisExport {

	// 社員ID
	private String employeeId;

	// 所属期間と雇用コード
	public List<EmploymentCodeAndPeriod> lstEmpCodeandPeriod;

}
