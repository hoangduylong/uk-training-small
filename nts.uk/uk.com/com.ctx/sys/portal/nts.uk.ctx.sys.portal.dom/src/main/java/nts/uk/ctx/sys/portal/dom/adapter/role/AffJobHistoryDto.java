package nts.uk.ctx.sys.portal.dom.adapter.role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AffJobHistoryDto {

	private String employeeId;

	private String jobTitleId;

	private String jobTitleName;

	private GeneralDate startDate;

	private GeneralDate endDate;
}
