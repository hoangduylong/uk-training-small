package nts.uk.ctx.sys.auth.pub.employee;

import java.util.List;
import lombok.Getter;

@Getter
public class NarrowEmpByReferenceRange {


	/**List 社員ID */
	private List<String> employeeID;

	public NarrowEmpByReferenceRange(List<String> employeeID) {
		this.employeeID = employeeID;
	}
}
