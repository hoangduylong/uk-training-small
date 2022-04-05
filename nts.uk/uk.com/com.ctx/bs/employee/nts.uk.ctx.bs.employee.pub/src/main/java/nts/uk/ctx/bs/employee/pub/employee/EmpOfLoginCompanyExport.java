package nts.uk.ctx.bs.employee.pub.employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmpOfLoginCompanyExport {

	/** 社員CD */
	private String scd;

	/** ビジネスネーム */
	private String bussinesName;

	/** 社員ID */
	private String sid;
}
