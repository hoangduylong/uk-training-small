package nts.uk.ctx.bs.employee.pub.companyhistory;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * 社員の在籍期間Exported
 * @author Hieult
 *
 */
@Getter
@RequiredArgsConstructor
public class EmpEnrollPeriodExported {

	/** 社員ID **/
	private final String empId;
	/** 期間 **/
	private final DatePeriod datePeriod;
	/** 出向状況 **/
	private final SecondedSituation secondedSituation;
	
	//[C-1] 出向なし
	public static  EmpEnrollPeriodExported noSecondment(String empId , DatePeriod datePeriod  ){
		//出向状況＝なし として作成する										
		return new EmpEnrollPeriodExported(empId, datePeriod, SecondedSituation.NONE);	
	}
	
	//[C-2] 出向中
	public static  EmpEnrollPeriodExported seconded(String empId , DatePeriod datePeriod  ){
		//出向状況＝出向中 として作成する										
		return new EmpEnrollPeriodExported(empId, datePeriod, SecondedSituation.SECONDED);	
	}
	
	//[C-3] 受入中
	public static  EmpEnrollPeriodExported accepting(String empId , DatePeriod datePeriod  ){
		//出向状況＝受入中 として作成する										
		return new EmpEnrollPeriodExported(empId, datePeriod, SecondedSituation.ACCEPTING);	
	}
}
