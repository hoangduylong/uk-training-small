/**
 * 
 */
package nts.uk.ctx.bs.employee.dom.employment.history;

import lombok.AllArgsConstructor;

/**
 * Enum : 給与区分
 */
@AllArgsConstructor
public enum SalarySegment {

	// 1: 日給 
	DailySalary(1),
	// 2: 日給月給
	DailyMonthlySalary(2),
	// 3: 時間給
	HourlySalary(3),
	// 4: 月給
	MonthlySalary(4);

	public final int value;

}
