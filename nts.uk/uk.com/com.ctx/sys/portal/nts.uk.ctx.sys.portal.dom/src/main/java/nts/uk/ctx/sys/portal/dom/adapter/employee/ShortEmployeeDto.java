package nts.uk.ctx.sys.portal.dom.adapter.employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
@AllArgsConstructor
@NoArgsConstructor
public class ShortEmployeeDto {

	private String companyId;
	
	private String employeeId;

	private String pId;

	private String employeeCode;

	private String personName;
}
