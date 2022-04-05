package nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmpInfoByCidSidImport {
	
	private String sid;

	private String personName;

	private String pid;

	private String cid;

	private String scd;

}
