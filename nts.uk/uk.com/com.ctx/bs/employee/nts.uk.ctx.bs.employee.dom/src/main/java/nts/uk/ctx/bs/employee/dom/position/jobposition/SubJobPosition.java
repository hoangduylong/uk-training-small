package nts.uk.ctx.bs.employee.dom.position.jobposition;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;

/**
 * 職務職位（兼務）
 * @author xuan vinh
 * */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubJobPosition extends AggregateRoot {
	/**職務職位ID（兼務） sub job position id*/
	private String subJobPosId;
	/**所属部門ID affiliation department id*/
	private String affiDeptId;
	/**役職ID job title id*/
	private String jobTitleId;
	/**Start date*/
	private GeneralDate startDate;
	/**End date*/
	private GeneralDate endDate;
	
	public static SubJobPosition createFromJavaType(String subJobPosId, String affiDeptId,
			String jobTitleId, GeneralDate startDate, GeneralDate endDate){
		return new SubJobPosition(subJobPosId, affiDeptId, jobTitleId,
				startDate, endDate);
	}
}
