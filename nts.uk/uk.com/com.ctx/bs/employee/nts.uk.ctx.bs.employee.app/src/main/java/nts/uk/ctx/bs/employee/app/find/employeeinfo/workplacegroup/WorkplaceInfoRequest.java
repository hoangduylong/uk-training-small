package nts.uk.ctx.bs.employee.app.find.employeeinfo.workplacegroup;

import java.util.List;

import lombok.Data;
import nts.arc.time.GeneralDate;

/**
 * @author anhdt
 *
 */
@Data
public class WorkplaceInfoRequest {
	private List<String> workplaceIds;
	private String baseDate;
	
	public GeneralDate toDate() {
		return GeneralDate.fromString(baseDate, "yyyy/MM/dd");
	}
}
