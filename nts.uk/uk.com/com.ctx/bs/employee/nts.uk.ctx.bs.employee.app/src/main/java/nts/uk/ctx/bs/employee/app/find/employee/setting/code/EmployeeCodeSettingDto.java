package nts.uk.ctx.bs.employee.app.find.employee.setting.code;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * EmployeeCodeSettingDto
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeCodeSettingDto {

	private String companyId;
	
	private int ceMethodAttr;
	
	private int numberOfDigits;
}
