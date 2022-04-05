package nts.uk.ctx.bs.employee.pub.temporaryabsence;

import lombok.Getter;
import nts.arc.time.calendar.period.DatePeriod;
/**
 * 社員の休職期間Exported
 * @author HieuLt
 *
 */
@Getter
public class EmpLeavePeriodExport {
	  /** 社員ID**/	
      private final String empID;
      /** 期間**/
      private final DatePeriod datePeriod;
        
      //	[C-0] 社員の休職期間Exported( 社員ID, 期間 )														
	public EmpLeavePeriodExport(String empID, DatePeriod datePeriod) {
		super();
		this.empID = empID;
		this.datePeriod = datePeriod;
	}    
}
