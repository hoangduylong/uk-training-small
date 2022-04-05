package nts.uk.ctx.bs.employee.app.command.position.jobposition;

import lombok.Getter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregItem;
import nts.uk.shr.pereg.app.PeregRecordId;

@Getter
public class SubJobPositionCommand {

	
	/**職務職位ID（兼務） sub job position id*/
	@PeregRecordId
	private String subJobPosId;
	
	/**所属部門ID affiliation department id*/
	@PeregItem("")
	private String affiDeptId;
	
	/**役職ID job title id*/
	@PeregItem("")
	private String jobTitleId;
	
	/**Start date*/
	@PeregItem("")
	private GeneralDate startDate;
	
	/**End date*/
	@PeregItem("")
	private GeneralDate endDate;
}
