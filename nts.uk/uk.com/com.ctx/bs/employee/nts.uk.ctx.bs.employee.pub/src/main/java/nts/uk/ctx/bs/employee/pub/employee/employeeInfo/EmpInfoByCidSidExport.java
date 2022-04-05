package nts.uk.ctx.bs.employee.pub.employee.employeeInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmpInfoByCidSidExport {

	private String sid;

	private String personName;

	private String pid;

	private String cid;

	private String scd;
}
