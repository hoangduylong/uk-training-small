/**
 * 
 */
package nts.uk.ctx.bs.employee.dom.workplace.assigned;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;

/**
 * @author danpv
 *
 */
public interface AssignedWrkplcRepository {

	public Optional<AssignedWorkplace> getByEmpIdAndStandDate(String employeeId, GeneralDate standandDate);

	public AssignedWorkplace getAssignedWorkplaceById(String assignedWorkplaceId);
	
	public List<AssignedWorkplace> getListBySId(String sid);
	/**
	 * 取得した「所属職場」を更新する
	 * @param domain
	 */
	void updateAssignedWorkplace(AssignedWorkplace domain);
}
