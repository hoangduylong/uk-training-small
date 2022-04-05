package nts.uk.ctx.bs.employee.pub.workplace;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.time.calendar.period.DatePeriod;
/**
 * 
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
@Getter
public class WkpInfoExport {
	 /**配属期間*/
	 private DatePeriod datePeriod;
	 /**職場ID*/
	 private String wpkID;
	 /**職場コード*/
	 private String wpkCD;
	 /**職場表示名*/
	 private String wpkName;
}
