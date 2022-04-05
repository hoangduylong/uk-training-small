package nts.uk.ctx.bs.employee.pub.spr.export;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 指定職場の指定在籍状態の社員を取得
 * @author Doan Duy Hung
 *
 */
@AllArgsConstructor
@Getter
public class EmpInDesignSprExport {
	
	/** The employee id. */
	// 社員ID
	private String employeeId;
	
	/** The status of emp. */
	// 在休退状態
	private int statusOfEmp;
	
}
