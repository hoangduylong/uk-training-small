package nts.uk.ctx.sys.gateway.ws.url;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.uk.ctx.sys.gateway.dom.adapter.employee.EmployeeInfoDtoImport;
import nts.uk.ctx.sys.gateway.dom.adapter.user.UserImportNew;
/**
 * 
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
@Getter
public class URLAccApprovalOutput {
	
	private EmployeeInfoDtoImport employeeInfoDtoImport;
	
	private UserImportNew userImport;
	
}
