package nts.uk.ctx.sys.portal.dom.adapter.employee;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneralEmployeeDto {
	
	private String companyId;
	
	private String employeeId;

	private String pId;

	private String employeeCode;

	private String personName;
}
