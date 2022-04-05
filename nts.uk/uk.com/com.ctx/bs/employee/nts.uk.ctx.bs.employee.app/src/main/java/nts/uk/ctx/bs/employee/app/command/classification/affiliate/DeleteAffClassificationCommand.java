/**
 * 
 */
package nts.uk.ctx.bs.employee.app.command.classification.affiliate;

import lombok.Getter;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregRecordId;

/**
 * @author danpv
 *
 */
@Getter
public class DeleteAffClassificationCommand {

	@PeregRecordId
	private String historyId;

	@PeregEmployeeId
	private String employeeId;

}
