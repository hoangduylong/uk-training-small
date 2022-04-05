package nts.uk.ctx.sys.auth.dom.employee.dto;

import lombok.Data;

@Data
public class RegulationInfoEmpImport {
	/** The employee id. */
	private String employeeId; // 社員ID

	/** The employee code. */
	private String employeeCode; // 社員コード

	/** The employee name. */
	private String employeeName; // 氏名

	/** The workplace code. */
	private String workplaceCode; // 職場の階層コード

	/** The workplace id. */
	private String workplaceId; // 職場の階層コード

	/** The workplace name. */
	private String workplaceName; // 職場の階層コード
}
