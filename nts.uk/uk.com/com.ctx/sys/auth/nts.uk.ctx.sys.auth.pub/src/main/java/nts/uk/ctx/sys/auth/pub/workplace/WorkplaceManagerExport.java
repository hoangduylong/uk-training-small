package nts.uk.ctx.sys.auth.pub.workplace;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.calendar.period.DatePeriod;
@Getter
@AllArgsConstructor
public class WorkplaceManagerExport {
	/**
	 * 職場管理者ID
	 */
	private String workplaceManagerId;
	/**
	 * 社員ID
	 */
	private String employeeId;
	/**
	 * 職場ID
	 */
	private String workplaceId;
	/**
	 * 履歴期間
	 */
	private DatePeriod historyPeriod;
	

}
