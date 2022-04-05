package nts.uk.ctx.bs.employee.pub.workplace.history;

import java.util.List;

import nts.arc.time.GeneralDate;

public interface WorkplaceHistoryItemPub {

	List<WorkplaceHistoryItemExport> findByEmpIdsAndDate(List<String> empIds, GeneralDate baseDate);
}
