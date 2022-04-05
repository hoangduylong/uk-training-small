package nts.uk.ctx.bs.employee.dom.employment.history;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.uk.shr.com.history.DateHistoryItem;
@Getter
@AllArgsConstructor
public class EmploymentHistoryIntermediate {
	private EmploymentHistory domain;
	private DateHistoryItem itemToBeUpdated;
}
