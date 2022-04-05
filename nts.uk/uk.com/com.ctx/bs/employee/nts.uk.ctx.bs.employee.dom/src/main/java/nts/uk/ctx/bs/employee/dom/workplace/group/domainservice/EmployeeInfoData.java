package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
/**
 * アルゴリズム.職場の所属社員を取得する( 職場ID, 期間 )	
 * @author HieuLt
 *
 */
@RequiredArgsConstructor
@Getter
public class EmployeeInfoData {
	/**社員ID **/
	private final String empId;
	/**社員CD **/
	private final String empCd;
	/**社員名 **/
	private final String empName;
	
}
