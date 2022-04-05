package nts.uk.ctx.sys.portal.dom.adapter.employee;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {

	private String companyId;

	private String personId;

	private String employeeId;

	private String employeeCode;

	private int deletedStatus;

	private GeneralDateTime deleteDateTemporary;

	private String removeReason;

	private String externalCode;
}
