package nts.uk.ctx.bs.employee.dom.employee.history;

import lombok.Getter;

/**
 * 社員ID付き所属会社履歴項目---Temporary											
 * @author HieuLt
 *
 */
@Getter
public class CompanyWithEmployeeID {
	/**社員ID **/
	private final String empId;
	/**履歴項目 **/
	private final AffCompanyHistItem affCompanyHistItem;
	public CompanyWithEmployeeID(String empId, AffCompanyHistItem affCompanyHistItem) {
		super();
		this.empId = empId;
		this.affCompanyHistItem = affCompanyHistItem;
	}
}
