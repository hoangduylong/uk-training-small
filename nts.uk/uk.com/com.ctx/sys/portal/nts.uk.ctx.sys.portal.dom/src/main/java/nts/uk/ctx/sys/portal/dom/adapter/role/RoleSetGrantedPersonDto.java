package nts.uk.ctx.sys.portal.dom.adapter.role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.calendar.period.DatePeriod;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleSetGrantedPersonDto {
	
	private String roleSetCd;

	private String companyId;

	private DatePeriod validPeriod;

	private String employeeID;
}
