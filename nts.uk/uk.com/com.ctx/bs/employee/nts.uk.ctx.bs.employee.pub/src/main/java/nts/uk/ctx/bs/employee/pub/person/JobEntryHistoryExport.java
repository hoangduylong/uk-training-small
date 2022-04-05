package nts.uk.ctx.bs.employee.pub.person;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;


/**
 * The Class JobEntryHistoryDto. 
 * Dto by Request List #01
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobEntryHistoryExport {
	
	/** The CompanyId */
	private String companyId;

	/** The employeeId */
	private String sId;

	/** The HiringType */
	private int hiringType;

	/** The RetireDate */
	private GeneralDate retirementDate;

	/** The EntryDate */
	private GeneralDate joinDate;

	/** The AdoptDate */
	private GeneralDate adoptDate;

}
