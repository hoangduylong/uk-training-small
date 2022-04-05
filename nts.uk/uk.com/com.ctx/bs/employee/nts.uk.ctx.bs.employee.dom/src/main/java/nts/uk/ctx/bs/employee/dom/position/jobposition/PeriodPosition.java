package nts.uk.ctx.bs.employee.dom.position.jobposition;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.time.GeneralDate;

@AllArgsConstructor
@Getter
public class PeriodPosition {

	/** The StartDate 開始日 */
	GeneralDate startDate;

	/** The EndDate 終了日 */
	GeneralDate endDate;

	public static PeriodPosition createFromJavaType(String startDate, String endDate) {
		return new PeriodPosition(GeneralDate.fromString(startDate, "yyyy/MM/dd"), GeneralDate.fromString(endDate, "yyyy/MM/dd"));
	}
}
