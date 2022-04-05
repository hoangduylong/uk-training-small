package nts.uk.ctx.bs.employee.dom.workplace.master.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.arc.time.GeneralDate;

@Data
@AllArgsConstructor
public class UpdateWorkplaceConfigParam {

	private String companyId;
	private String historyId;
	private GeneralDate startDate;
	private GeneralDate endDate;

}
