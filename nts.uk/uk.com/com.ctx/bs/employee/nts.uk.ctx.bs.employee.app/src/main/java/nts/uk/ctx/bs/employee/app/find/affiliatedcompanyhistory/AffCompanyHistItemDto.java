/**
 * 
 */
package nts.uk.ctx.bs.employee.app.find.affiliatedcompanyhistory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import nts.arc.time.GeneralDate;

/**
 * @author hieult
 *
 */
@Getter
@Setter	
@AllArgsConstructor
public class AffCompanyHistItemDto {

	/** 社員ID */
	private String employeeID;
	
	private String historyId;
	
	private boolean destinationData;
	
	private GeneralDate startDate;
	
	private GeneralDate endDate;

}
