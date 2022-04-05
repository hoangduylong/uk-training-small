package nts.uk.ctx.bs.employee.pub.department.master;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AffDpmHistItemExport {
	/** The history Id. */
	// 履歴ID
	private String historyId;

	/** The Employee Id. */
	// 社員ID
	private String employeeId;

	/** The department code. */
	/* 部門コード */
	private String departmentId;

	/** The Affiliation History Transfer type. */
	// 所属履歴異動種類
	private String affHistoryTranfsType;

	// 分配率
	private BigDecimal distributionRatio;
}
