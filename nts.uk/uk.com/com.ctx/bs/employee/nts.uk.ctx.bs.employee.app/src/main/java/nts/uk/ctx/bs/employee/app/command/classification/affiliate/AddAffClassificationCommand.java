/**
 * 
 */
package nts.uk.ctx.bs.employee.app.command.classification.affiliate;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregEmployeeId;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregRecordId;

/**
 * @author danpv
 *
 */
@Getter
public class AddAffClassificationCommand{
	@PeregRecordId
	private String historyId;
	
	@PeregEmployeeId
	private String employeeId;

	/**
	 * 開始日
	 */
	@PeregItem("IS00026")
	private GeneralDate startDate;

	/**
	 * 終了日
	 */
	@PeregItem("IS00027")
	private GeneralDate endDate;

	/**
	 * 分類CD
	 */
	@PeregItem("IS00028")
	private String classificationCode;
}
