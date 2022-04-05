package nts.uk.ctx.bs.employee.pub.spr.export;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.time.GeneralDate;
/**
 * 社員所属職位履歴を取得
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
@Getter
public class EmpJobHistSprExport {
	/** The employee id. */
	// 社員ID
	private String employeeID;

	/** The job title id. */
	// 職位ID
	private String jobTitleID;

	/** The job title name. */
	// 職位名称
	private String jobTitleName;

	/** The start date. */
	// 配属期間 start
	private GeneralDate startDate;

	/** The end date. */
	// 配属期間 end
	private GeneralDate endDate;
}
