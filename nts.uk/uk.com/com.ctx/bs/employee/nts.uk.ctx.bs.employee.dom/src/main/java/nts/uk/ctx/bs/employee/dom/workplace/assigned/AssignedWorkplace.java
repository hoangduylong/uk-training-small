package nts.uk.ctx.bs.employee.dom.workplace.assigned;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.uk.shr.com.history.strategic.PersistentResidentHistory;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * 所属職場履歴
 * 
 * @author xuan vinh
 *
 */

@Getter
@AllArgsConstructor
public class AssignedWorkplace extends AggregateRoot implements PersistentResidentHistory<DateHistoryItem, DatePeriod, GeneralDate>{
	
	/**Employee id*/
	//// 社員ID
	private String employeeId;
	
	/***
	 * assigned workplace id
	 */
	//職場ID
	private String assignedWorkplaceId;
	
	private String workplaceId;
	
	private List<DateHistoryItem> dateHistoryItem;

	@Override
	public List<DateHistoryItem> items() {
		return this.dateHistoryItem;
	}
	
	public static AssignedWorkplace creatFromJavaType(String employeeId, String assignedWorkplaceId , String workplaceId) {
		return new AssignedWorkplace(employeeId, assignedWorkplaceId, workplaceId, null);
		
	}
	
}
