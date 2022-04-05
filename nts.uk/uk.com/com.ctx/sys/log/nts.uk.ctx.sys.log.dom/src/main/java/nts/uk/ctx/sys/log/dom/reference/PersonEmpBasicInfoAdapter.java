package nts.uk.ctx.sys.log.dom.reference;

import java.util.List;
import java.util.Map;

/**
 * 
 * @author thuongtv
 *
 */

public interface PersonEmpBasicInfoAdapter {
	
	/**
	 * Get employee code by employee ID
	 * @return String
	 */
    String getEmployeeCodeByEmpId(String empId);

	/**
	 * Get list employee code by employee ID
	 * @return Map<String,String>
	 */
	Map<String,String> getEmployeeCodesByEmpIds(List<String> empIds);
}
