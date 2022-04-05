/**
 * 
 */
package nts.uk.ctx.bs.employee.pub.classification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

/**
 * @author laitv
 *
 */
@Getter
@Setter	
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AffCompanyHistItemExport {

	/** 社員ID */
	private String employeeID;
	
	private String historyId;
	
	private boolean destinationData;
	
	private GeneralDate startDate;
	
	private GeneralDate endDate;

}
