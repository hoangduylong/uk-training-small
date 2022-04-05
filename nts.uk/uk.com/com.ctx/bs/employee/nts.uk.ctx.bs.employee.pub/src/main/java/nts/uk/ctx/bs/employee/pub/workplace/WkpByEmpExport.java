package nts.uk.ctx.bs.employee.pub.workplace;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
/**
 * 
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
@Getter
public class WkpByEmpExport {
	
	/**社員ID*/
	 private String employeeID;
	 /**職場リスト*/
	 private List<WkpInfoExport> lstWkpInfo;
	
}
