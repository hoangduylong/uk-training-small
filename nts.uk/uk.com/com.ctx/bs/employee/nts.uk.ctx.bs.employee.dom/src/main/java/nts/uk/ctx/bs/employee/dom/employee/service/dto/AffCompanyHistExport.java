package nts.uk.ctx.bs.employee.dom.employee.service.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AffCompanyHistExport {
	
	/** The employee id. */
	// 社員ID
	private String employeeId;
	
	// List Affiliated company history item
	private List<AffComHistItem> lstAffComHistItem;

}
