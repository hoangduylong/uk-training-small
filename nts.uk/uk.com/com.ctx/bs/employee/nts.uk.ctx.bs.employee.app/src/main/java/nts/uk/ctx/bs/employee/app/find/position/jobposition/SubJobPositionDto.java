package nts.uk.ctx.bs.employee.app.find.position.jobposition;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;
import nts.uk.shr.pereg.app.PeregItem;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubJobPositionDto {
	/**職務職位ID（兼務） sub job position id*/
	@PeregItem("")
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
