package nts.uk.ctx.bs.employee.pub.employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Dto for requestList No.614
 *
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
//社員CD、ビジネスネーム、カナから検索キーワードをもとに社員IDを取得する
public class EmpInfo614 {

	/** The employee id. 社員ID */
	private String employeeId;

	/** The person id. 個人ID */
	private String PersonalId;

	/** The EmployeeCode. 社員CD */
	private String employeeCode;
}
